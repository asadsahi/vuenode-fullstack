/* eslint consistent-return: "off" */
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const _ = require('lodash');
const DB = require('../../db/models');
const { User, UserImage } = DB;
const errorHandler = require('../core/errorHandler');
const { getAccessToken } = require('./token');
const logger = require('../logger');

// =================== OAUTH ROUTES ====================

/**
 * Signup
 */
exports.signup = (req, res) => {
  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  const model = Object.assign(req.body, { provider: 'local' });
  User.create(model)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

/**
 * Signin after passport authentication
 */
exports.signin = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err || !user) {
      res.status(400).send(errorHandler.formatMessage('Incorrect credentials'));
    } else {
      // res.json(user);
      // user has authenticated correctly thus we create a JWT token
      res.json(getAccessToken(user));
    }
  })(req, res, next);
};

/**
 * Signout
 */
exports.signout = (req, res) => {
  req.logout();
  res.status(200).json({});
};

/**
 * OAuth provider call
 */
exports.oauthCall = (strategy, scope) => (req, res, next) => {
  // Not needed as this is now jwt based and not session based
  // if (req.query && req.query.redirect_to)
  //   req.session.redirect_to = req.query.redirect_to;

  // Authenticate
  passport.authenticate(strategy, scope)(req, res, next);
};

/**
 * OAuth callback
 */
exports.oauthCallback = (strategy) => (req, res, next) => {
  // info.redirect_to contains inteded redirect path
  passport.authenticate(strategy, { session: false }, (err, user) => {
    if (err) {
      return res.redirect(`/login?err=${encodeURIComponent(errorHandler.formatMessage(err))}`);
    }
    if (!user) {
      return res.redirect('/login');
    }
    const token = getAccessToken(user);
    // res.locals.token = token;
    const encodedToken = encodeURIComponent(token);
    res.redirect(`/?access_token=${encodedToken}`);
  })(req, res, next);
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = (providerUserProfile, done) => {
  User.findOne({
    where: {
      email: providerUserProfile.email,
    },
  })
    .then((user) => {
      if (user && user.provider === 'local') {
        done('Another user with this email already exist');
      }

      if (user) {
        // Social user created before so pass that on
        return done(null, user);
      }

      User.create({
        firstName: providerUserProfile.firstName,
        lastName: providerUserProfile.lastName,
        email: providerUserProfile.email,
        username: providerUserProfile.username,
        displayName: providerUserProfile.displayName,
        profileImageURL: getSocialLoginImageUrl(providerUserProfile),
        provider: providerUserProfile.provider,
        providerData: providerUserProfile.providerData,
      })
        .then((newUser) => {
          done(null, newUser);
        })

        // Error creating user
        .catch((err) => {
          logger.error(err);
          done(err);
        });
    })
    // Error finding User
    .catch((err) => {
      logger.error(err);
      done(err);
    });
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = (req, res) => {
  const { user } = req;
  const { provider } = req.query;

  if (!user) {
    return res.status(401).json('User is not authenticated');
  } else if (!provider) {
    return res.status(400).send();
  }

  // Delete the additional provider
  if (user.additionalProvidersData[provider]) {
    delete user.additionalProvidersData[provider];

    // Then tell mongoose that we've updated the additionalProvidersData field
    user.markModified('additionalProvidersData');
  }

  user.save((err) => {
    if (err) {
      return res.status(400).send(errorHandler.formatMessage(err));
    }
    req.login(user, (e) => {
      if (e) {
        return res.status(400).send(e);
      }
      return res.json(user);
    });
    return res.status(400);
  });
};

// ================== PROFILE ROUTES ================
exports.updateProfile = (req, res) => {
  req.user
    .update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })
    .then((user) =>
      res.json(_.pick(user, global.appConfig.whitelistedUserFields)))
    .catch((err) => res.status(400).send(errorHandler.formatMessage(err)));
};

/**
 * Get profile picture
 */
exports.getProfilePicture = (req, res) => {
  UserImage.findOne({
    where: {
      id: req.params.id,
    },
  }).then(
    (userImage) => {
      if (userImage) {
        res.contentType(userImage.contentType);
        res.send(userImage.data);
      } else {
        res.status(404).send('Not found');
      }
    },
    (err) => {
      res.status(400).send(errorHandler.formatMessage(err));
    }
  );
};

/**
 * Update profile picture
 */
exports.changeProfilePicture = (req, res) => {
  req.user.getUserImage().then((image) => {
    let promise;
    if (image) {
      promise = image.update({
        contentType: req.body.mimetype,
        data: req.body.url,
      });
    } else {
      promise = req.user.createUserImage({
        contentType: req.body.mimetype,
        data: req.body.url,
      });
    }

    promise
      .then((img) => {
        res.json(img);
      })
      .catch(() =>
        res.status(400).send('Error while trying to update user picture'));
  });
};

/**
 * Send User
 */
exports.getProfile = (req, res) => {
  let safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: req.user.displayName,
      provider: req.user.provider,
      username: req.user.username,
      createdAt: req.user.createdAt.toString(),
      updatedAt: req.user.createdAt.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: req.user.email,
      lastName: req.user.lastName,
      firstName: req.user.firstName,
      additionalProvidersData: req.user.additionalProvidersData,
    };
  } else {
    return res.status(401).send({});
  }

  res.json(safeUserObject || null);
};

// ====================== USER PASSWORD ROUTES =========================
const smtpTransport = nodemailer.createTransport(global.appConfig.mailOptions);

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = (req, res) => {
  // Create token
  // Save token for user
  // Create reset email
  // Send email

  if (!req.body.username) {
    return res.status(400).send('Username field must not be blank');
  }

  crypto.randomBytes(20, (err, buffer) => {
    const token = buffer.toString('hex');
    if (err) {
      return res.status(400).send('Unable to create encrypted token');
    }
    User.findOne({
      where: {
        email: req.body.username.toLowerCase(),
      },
    })
      .then((user) => {
        if (user.provider !== 'local') {
          return res
            .status(400)
            .send(`It seems like you signed up using your ${user.provider} account`);
        }
        /* eslint no-param-reassign: "off" */
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user
          .save()
          .then((u) => {
            const httpTransport = req.secure ? 'https://' : 'http://';
            const baseUrl =
              req.app.get('domain') || httpTransport + req.headers.host;

            res.render(
              'reset-password-email',
              {
                name: u.displayName,
                appName: global.appConfig.appTitle,
                url: `${baseUrl}/api/auth/reset/${token}`,
              },
              (e, emailHTML) => {
                if (e) {
                  return res
                    .status(500)
                    .send('Unable to create reset token email');
                }

                const mailOptions = {
                  to: u.email,
                  from: global.appConfig.mailOptions.from,
                  subject: 'Password Reset',
                  html: emailHTML,
                };
                smtpTransport.sendMail(mailOptions, (er) => {
                  if (er) {
                    return res.status(400).send('Failure sending email');
                  }
                  res.json({
                    message:
                      'An email has been sent to the provided email relating to this username with further instructions.',
                  });
                });
              }
            );
          })
          .catch(() =>
            res.status(400).send('Unable to save email reset token for user'));
      })
      .catch(() =>
        res.status(400).send('No account with that username has been found'));
  });
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = (req, res) => {
  User.findOne({
    where: {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
  })
    .then(() =>
      res.redirect(`/login/resetpassword?resetToken=${req.params.token}`))
    .catch(() => res.redirect('/login/resetpassword'));
};

/**
 * Reset password POST from email token
 */
exports.reset = (req, res) => {
  // Check if token is valid
  // Verify both passwords match
  // Update user - clean token
  // Create confirmation email
  // Send email

  const passwordDetails = req.body;

  if (!passwordDetails) {
    return res.status(400).send('Reset details are not provided');
  }

  User.findOne({
    where: {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
  })
    .then((user) => {
      if (passwordDetails.newPassword !== passwordDetails.verifyPassword) {
        return res.status(400).send('Passwords do not match');
      }

      user
        .update({
          password: user.encryptPassword(passwordDetails.newPassword),
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        })
        .then((u) => {
          res.render(
            'reset-password-confirm-email',
            {
              name: u.displayName,
              appName: global.appConfig.appTitle,
            },
            (err, emailHTML) => {
              if (err) {
                return res
                  .status(500)
                  .send('Unable to create reset token email');
              }

              const mailOptions = {
                to: u.email,
                from: global.appConfig.mailOptions.from,
                subject: 'Your password has been changed',
                html: emailHTML,
              };

              smtpTransport.sendMail(mailOptions, () => {
                if (err) {
                  return res.status(400).send('Failure sending email');
                }
                // successfully sent
                res.json({});
              });
            }
          );
        })
        .catch((e) => res.status(400).send(errorHandler.formatMessage(e)));
    })
    .catch(() =>
      res.status(400).send('Password reset token is invalid or has expired.'));
};

/**
 * Change Password
 */
exports.changePassword = (req, res) => {
  // Init Variables
  const passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.newPassword) {
      User.findOne({
        where: {
          id: req.user.id,
        },
      })
        .then((user) => {
          if (user.validPassword(passwordDetails.currentPassword)) {
            if (
              passwordDetails.newPassword === passwordDetails.verifyPassword
            ) {
              const newPassword = user.encryptPassword(passwordDetails.newPassword);

              user
                .update(
                  {
                    password: newPassword,
                  },
                  {
                    where: {
                      id: user.id,
                    },
                  }
                )
                .then((u) => {
                  if (!u) {
                    return res
                      .status(400)
                      .send(errorHandler.formatMessage('Invalid credentials'));
                  }
                  res.json(['Password changed successfully']);
                });
            } else {
              res.status(400).send(['Passwords do not match']);
            }
          } else {
            res.status(400).send(['Current password is incorrect']);
          }
        })
        .catch(() => {
          res.status(400).send(['User is not found']);
        });
    } else {
      res.status(400).send('Please provide a new password');
    }
  } else {
    res.status(401).send('User is not signed in');
  }
};

function getSocialLoginImageUrl(profileData) {
  return (
    profileData.profileImageURL || profileData.providerData.image.url || ''
  );
}
