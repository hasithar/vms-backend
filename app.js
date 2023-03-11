import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ruoutes
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.route.js';
import authRouter from './routes/auth.route.js';
import appointmentsRouter from './routes/appointments.route.js';
import customersRouter from './routes/customers.route.js';
import reservationsRouter from './routes/reservations.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// routr middleware
app.use('/', indexRouter);
// api v1
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/appointments', appointmentsRouter);
app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/reservations', reservationsRouter);
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
