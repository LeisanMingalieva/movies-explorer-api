const Movie = require('../models/movies');
const NotFoundError = require('../helpers/errors/NotFoundError');
const ForbiddenError = require('../helpers/errors/ForbidddenError');
const BadRequestError = require('../helpers/errors/BadRequestError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user.id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovies = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Такой фильм не найден в базе');
      if (req.user.id._id === movie.owner.toString()) {
        return movie.deleteOne();
      }
      throw new ForbiddenError('Вы не можете удалить фильм');
    })
    .then((removedMovie) => res.send(removedMovie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovies, deleteMovies };
