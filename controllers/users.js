const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { getJwtToken } = require('../helpers/jwt');
const UnauthorizedError = require('../helpers/errors/Unauthorized');
const ConflictError = require('../helpers/errors/ConflictError');
const BadRequestError = require('../helpers/errors/BadRequestError');
const NotFoundError = require('../helpers/errors/NotFoundError');

// запрос на "/"
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// GET запрос на '/me'
const getUserInfo = (req, res, next) => {
  User.findById(req.user.id._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Такой пользователь не найден'));
      } else {
        res.send({
          name: user.name,
          email: user.email,
        });
      }
    })
    .catch(next);
};

// PATCH запрос на '/me'
const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user.id._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = { getUsers, updateProfile, getUserInfo };
