const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../database.json')[env];

const models = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/* eslint global-require: off */
const modules = [
  require('./content.model.js'),
  require('./contenttext.model.js'),
  require('./language.model.js'),
  // Shop models
  require('./shop/productcategory.model.js'),
  require('./shop/product.model.js'),
  require('./shop/customer.model.js'),
  require('./shop/order.model.js'),
  require('./shop/orderdetails.model.js'),
];

// Initialize models
modules.forEach(module => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});

// Apply associations
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
