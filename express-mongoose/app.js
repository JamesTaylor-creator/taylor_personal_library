//npm module imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
//application module imports
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

let connection_string = "mongodb://127.0.0.1:27017/mongoose_test_app?retryWrites=true&w=majority";
//Server discovery and monitoring engine deprecated
//set to true, our app will use the latest and greatest
mongoose.set('useUnifiedTopology', true);
// False by default, when set to true, default index creation 
// will use createIndex() instead of ensureIndex()
mongoose.set('useCreateIndex', true);
// True by default, when false, the findOneAndUpdate()
// findOneandRemove(), use native instead of findAndModify()
mongoose.set('useFindAndModify', false);
// The underlying MongoDb driver that has been deprecated,
// the parsing of the URL
mongoose.set('useNewUrlParser', true);

// Return a javascript promise
mongoose.connect(connection_string)
    .then(
        // NOTE: Connection success
        () => {
            // a successful connection
            console.log('Successful Conncetion: Connected to MongoDB');
        }
    )
    .catch(
        // NOTE: Connection failure
        (error) => {
            console.log('Connection Failure: An error has occured: ', error);
        }
    );
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

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

module.exports = app;
