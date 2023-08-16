const router = require('express').Router();

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

const { movieIdValidation, movieValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', movieIdValidation, createMovies);
router.delete('/:movieId', movieValidation, deleteMovies);

module.exports = router;
