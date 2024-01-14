require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const path = require('path');
// const passport = require('./config/passport');
// const passport = require('passport');
// const passport = require('./config/passport')
// const bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

// Configure Express to use sessions
// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));


// Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     User.findOne({ where: { username } })
//       .then((user) => done(null, user))
//       .catch(done);
//   }
// ));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


// app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// static folders
// app.use(express.static('public'));


// project routes
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send('Something went wrong');
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3000';
// app.set('port', port);
app.listen(port, () => console.log('Server listening on port 3000'));

module.exports = app;
