var express = require('express');
var router = express.Router();

let { Book } = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {

  let books_query = Book.find({});
  books_query.sort({ title: -1});
  let find_promise = books_query.exec();
        find_promise
            .then((book) => {
              res.json(book);
            })
            .catch((err) => {
              res.status(500).json(error);
            });

});
router.post('/', function(req,res, next){
  const new_book = new Book(req.body);
  let save_promise = new_book.save();
        console.log('Is a Promise: ' + (save_promise instanceof Promise));
        save_promise 
            .then((save_book) => {
                res.json(save_book);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
});

module.exports = router;
