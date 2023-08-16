const NotFoundError = require('../helpers/errors/NotFoundError');

const errorHandler = (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
};

module.exports = { errorHandler };
