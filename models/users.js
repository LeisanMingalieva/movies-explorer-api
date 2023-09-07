const mongoose = require('mongoose');
const validator = require('validator');

const userShema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    // по умолчанию хеш пароля юзера не будет возвращаться в базу
    select: false,
  },
}, { versionKey: 'false' });

const User = mongoose.model('user', userShema);

module.exports = User;
