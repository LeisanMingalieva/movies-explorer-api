const router = require('express').Router();

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

// const { movieIdValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovies);
// router.delete('/:movieId', movieIdValidation, deleteMovies);
router.delete('/:movieId', deleteMovies);

module.exports = router;
