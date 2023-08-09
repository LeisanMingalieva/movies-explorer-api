const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

// роуты без авторизации
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// обработчик несуществующих роутов
// router.use('/', (req, res, next) => {
//   next(new NotFoundError('Такой страницы не существует'));
// });

module.exports = router;
