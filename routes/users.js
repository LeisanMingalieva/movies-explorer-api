const router = require('express').Router();
// const {
//   userIdValidation, userInfoValidation, avatarValidation
// } = require('../middlewares/validation');
const { getUsers, getUserInfo, updateProfile } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', updateProfile);

module.exports = router;
