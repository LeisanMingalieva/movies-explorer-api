const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { getJwtToken } = require('../helpers/jwt');
const UnauthorizedError = require('../helpers/errors/Unauthorized');
const ConflictError = require('../helpers/errors/ConflictError');
const BadRequestError = require('../helpers/errors/BadRequestError');
const NotFoundError = require('../helpers/errors/NotFoundError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  let baseUser;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      baseUser = user;
      return bcrypt.compare(password, baseUser.password);
    })
    .then((matched) => {
      if (!matched) return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      const token = getJwtToken({ _id: baseUser._id });
      return res.send({ token });
    })
    .catch(next);
};

const register = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10) // хешируем пароль
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name, email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким Email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неверные данные'));
      } else {
        next(err);
      }
    });
};
// GET запрос на "/"
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

module.exports = {
  getUsers, updateProfile, getUserInfo, register, login,
};
