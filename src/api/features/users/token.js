const _ = require('lodash');
const jwt = require('jsonwebtoken');

function getAccessToken(user) {
  const userInfo = _.pick(user, [
    ...global.appConfig.whitelistedUserFields,
    'id',
  ]);
  // https://github.com/auth0/node-jsonwebtoken
  const token = jwt.sign({ ...userInfo }, global.appConfig.Security.JWT_SECRET, { expiresIn: '1d' });
  return token;
}

module.exports = {
  getAccessToken,
};
