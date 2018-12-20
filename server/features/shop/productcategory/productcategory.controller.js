/* eslint consistent-return: "off" */
const DB = require('../../../db/models');

const { ProductCategories } = DB;
const errorHandler = require('../../core/errorHandler');

exports.getAll = (req, res) => {
  ProductCategories.findAll({})
    .then(productCategories => res.json(productCategories))
    .catch(err => res.status(400).send(err));
};

exports.get = (req, res) => {
  ProductCategories.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(product => res.json(product))
    .catch(err => res.status(400).send(err));
};

exports.post = (req, res) => {
  ProductCategories.create({
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
  })
    .then(newProduct => res.json(newProduct))
    .catch(err => res.status(400).send(err));
};

exports.put = (req, res) => {
  ProductCategories.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(customer => {
      customer
        .update({
          name: req.body.name,
          description: req.body.description,
          icon: req.body.icon,
        })
        .then(updatedCustomer => {
          res.json(updatedCustomer);
        })
        .catch(err => res.status(400).send(errorHandler.formatMessage(err)));
    })
    .catch(err => res.status(400).send(errorHandler.formatMessage(err)));
};

exports.delete = (req, res) => {
  ProductCategories.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(deleteCount => res.json(deleteCount))
    .catch(err => {
      res.status(400).send(err);
    });
};
