/* eslint consistent-return: "off" */
exports.formatMessage = err => {
  // Sequelize validation messages validation
  if (err.name === 'SequelizeValidationError') {
    return err.errors.map(e => ({
      key: e.path,
      value: e.message
    }));
  }

  if (err.name === 'SequelizeDatabaseError') {
    return [err.message];
  }

  if (typeof err === 'string') {
    return [err];
  }
};
