let acl = require('acl');

// Using the memory backend
/* eslint new-cap: "off" */
acl = new acl(new acl.memoryBackend());

/**
 * Invoke productcategory Permissions
 */
exports.invokeRolesPolicies = () => {
  acl.allow([
    {
      roles: ['admin'],
      allows: [
        {
          resources: '/api/productcategory',
          permissions: '*',
        },
      ],
    },
  ]);
};

/**
 * Check If productcategory Policy Allows
 */
exports.isAllowed = (req, res, next) => {
  const roles = req.user ? req.user.roleNames : ['user'];

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
