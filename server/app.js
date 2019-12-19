require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var cors = require('cors');

var app = express();

console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, () => { }, { useNewUrlParser: true })
  .then(() => {
    console.log('connected!');
  })
  .catch(err => {
    console.log(err);
  });
;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "build")));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    credentials: true,
    origin: true
  }
  ))

const authRouter = require('./routes/authRoutes');
app.use('/api/auth', authRouter);

const upload = require('./routes/Upload');
app.use('/api/upload', upload);

const StockData = require('./routes/DataRoute');
app.use('/api/news', StockData);

const Watchlist = require('./routes/WatchlistRoute');
app.use('/api/watchlist', Watchlist);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
