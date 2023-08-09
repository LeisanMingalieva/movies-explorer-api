const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, register } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../helpers/errors/NotFoundError');

// роуты без авторизации
router.post('/signin', login);
router.post('/signup', register);
// роуты, требующие авторизацию
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// обработчик несуществующих роутов
router.use('/', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
