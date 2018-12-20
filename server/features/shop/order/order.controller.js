const DB = require('../../../db/models');

const { Orders } = DB;
const errorHandler = require('../../core/errorHandler');

exports.getAll = (req, res) => {
  Orders.findAll({})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).send(err));
};

exports.get = (req, res) => {
  Orders.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(product => res.json(product))
    .catch(err => res.status(400).send(err));
};

exports.post = (req, res) => {
  Orders.create({
    discount: req.body.discount,
    comments: req.body.comments,
    customerId: req.body.customerId,
    productId: req.body.productId,
  })
    .then(newProduct => res.json(newProduct))
    .catch(err => res.status(400).send(err));
};

exports.put = (req, res) => {
  Orders.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(customer => {
      customer
        .update({
          discount: req.body.discount,
          comments: req.body.comments,
          customerId: req.body.customerId,
          productId: req.body.productId,
        })
        .then(updatedCustomer => {
          res.json(updatedCustomer);
        })
        .catch(err => res.status(400).send(errorHandler.formatMessage(err)));
    })
    .catch(err => res.status(400).send(errorHandler.formatMessage(err)));
};

exports.delete = (req, res) => {
  Orders.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(deleteCount => res.json(deleteCount))
    .catch(err => {
      res.status(400).send(err);
    });
};
