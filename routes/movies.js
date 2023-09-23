const router = require('express').Router();

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

const { movieIdValidation, movieValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', movieValidation, createMovies);
router.delete('/:movieId', movieIdValidation, deleteMovies);

module.exports = router;
