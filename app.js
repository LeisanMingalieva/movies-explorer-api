require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { error } = require('./middlewares/error');
const router = require('./routes/index');

const { PORT = 5000 } = process.env;
const app = express();
app.listen(PORT, () => {
  console.log('Сервер запущен!');
});
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
// mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(router);
app.use(errors());
app.use(error);
