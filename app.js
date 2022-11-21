require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const UsersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const todosRouter = require('./controllers/todos');
const logoutRouter = require('./controllers/logout');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authExtractor = require('./middleware/auth');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('Conecto a MongoDB');
  } catch (error) {
    console.log('No Conecto a MongoDB');
  }
})();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded());
app.use('/api/users', UsersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/todos', authExtractor, todosRouter);

app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/singUp', express.static(path.resolve(__dirname, 'views', 'singUp')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/app/:id', express.static(path.resolve(__dirname, 'views', 'app')));

module.exports = app;
