const DB = require('../../../db/models');

const { Customers } = DB;
const errorHandler = require('../../core/errorHandler');

exports.getAll = (req, res) => {
  Customers.findAll({})
    .then(customers => res.json(customers))
    .catch(err => res.status(400).send(err));
};

exports.get = (req, res) => {
  Customers.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(customer => res.json(customer))
    .catch(err => res.status(400).send(err));
};

exports.post = (req, res) => {
  Customers.create({
    name: req.body.name,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    city: req.body.city,
    gender: req.body.gender,
  })
    .then(newCustomer => res.json(newCustomer))
    .catch(err => res.status(400).send(err));
};

exports.put = (req, res) => {
  Customers.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(customer => {
      customer
        .update({
          name: req.body.name,
          email: req.body.email,
          dateOfBirth: req.body.dateOfBirth,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          city: req.body.city,
          gender: req.body.gender,
        })
        .then(updatedCustomer => {
          res.json(updatedCustomer);
        })
        .catch(err => res.status(400).send(errorHandler.formatMessage(err)));
    })
    .catch(err => res.status(400).send(errorHandler.formatMessage(err)));
};

exports.delete = (req, res) => {
  Customers.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(deleteCount => res.json(deleteCount))
    .catch(err => {
      res.status(400).send(err);
    });
};
