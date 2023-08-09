const router = require('express').Router();

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

// const { cardIdValidation, cardValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovies);
router.delete('/:id', deleteMovies);

module.exports = router;
