const DB = require('../../../db/models');

const { Products } = DB;
const errorHandler = require('../../core/errorHandler');

exports.getAll = (req, res) => {
  Products.findAll({})
    .then(products => res.json(products))
    .catch(err => res.status(400).send(err));
};

exports.get = (req, res) => {
  Products.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(product => res.json(product))
    .catch(err => res.status(400).send(err));
};

exports.post = (req, res) => {
  Products.create({
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
    buyingPrice: req.body.buyingPrice,
    sellingPrice: req.body.sellingPrice,
    unitsInStock: req.body.unitsInStock,
    isActive: req.body.isActive,
    isDiscontinued: req.body.isDiscontinued,
    categoryId: req.body.categoryId,
  })
    .then(newProduct => res.json(newProduct))
    .catch(err => res.status(400).send(err));
};

exports.put = (req, res) => {
  Products.findOne({
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
          buyingPrice: req.body.buyingPrice,
          sellingPrice: req.body.sellingPrice,
          unitsInStock: req.body.unitsInStock,
          isActive: req.body.isActive,
          isDiscontinued: req.body.isDiscontinued,
          categoryId: req.body.categoryId,
        })
        .then(updatedCustomer => {
          res.json(updatedCustomer);
        })
        .catch(err => res.status(400).send(errorHandler.formatMessage(err)));
    })
    .catch(err => res.status(400).send(errorHandler.formatMessage(err)));
};

exports.delete = (req, res) => {
  Products.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(deleteCount => res.json(deleteCount))
    .catch(err => {
      res.status(400).send(err);
    });
};
