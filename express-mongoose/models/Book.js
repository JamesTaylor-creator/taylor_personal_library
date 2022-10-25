const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book_schema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    author: String,
});

const Book = mongoose.model('book', book_schema);
module.exports = Book;