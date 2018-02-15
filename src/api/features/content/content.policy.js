let acl = require('acl');

// Using the memory backend
/* eslint new-cap: "off" */
acl = new acl(new acl.memoryBackend());

/**
 * Invoke content Permissions
 */
exports.invokeRolesPolicies = () => {
  acl.allow([
    {
      roles: ['admin'],
      allows: [{
        resources: '/api/content',
        permissions: '*',
      },
      {
        resources: '/api/content/:locale',
        permissions: '*',
      }],
    },
    {
      roles: ['user'],
      allows: [{
        resources: '/api/content',
        permissions: ['get'],
      }],
    },
    {
      roles: ['guest'],
      allows: [{
        resources: '/api/content',
        permissions: ['get'],
      }],
    },
  ]);
};

/**
 * Check If content Policy Allows
 */
exports.isAllowed = (req, res, next) => {
  const roles = (req.user) ? req.user.roleNames : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), (err, isAllowed) => {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    }
    if (isAllowed) {
      // Access granted! Invoke next middleware
      return next();
    }
    return res.status(403).json('User is not authorized');
  });
};
