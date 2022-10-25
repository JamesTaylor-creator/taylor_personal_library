const mongoose = require('mongoose');
const moment = require('moment');
const Book = require('./model/book');

console.log("Initializing Mongoose Test");

let connection_string = "mongodb://localhost:27017/taylor_personal_library?retryWrites=true&w=majority";

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
            // Annoynmous function
            // Note: All work with MongoDB must happen after 
            // a successful connection
            console.log('Connected to MongoDB');
            //Using postman, i can create the ability to pull JSON eg. localhost3000/books/
            create_book();
            //update_one_book();
            //delete_one_book();
            //sort_books();
        }
    )
    .catch(
        // NOTE: Connection failure
        (error) => {
            console.log('An error has occured: ', error);
        }
    );
        
    //Duplicated firstbook
    function create_book(){
        console.log('TEST ==>> Creating a new book.');

        const new_book = new Book({
            title: 'Tales of the City',
            description: 'Tales of the City is the first book in the Tales of the City series, originally serialized in the San Francisco Chronicle. Set in 1970s San Francisco, it follows the residents of a small apartment complex at 28 Barbary Lane, including the eccentric landlady, Anna Madrigal',
            author: 'Armistead Maupin',
            reviews: 'Since 1976, Maupins Tales of the City has etched itself upon the hearts and minds of its readers, both straight and gay. From a groundbreaking newspaper serial in the San Francisco Chronicle to a bestselling novel to a critically acclaimed PBS series, Tales (all six of them) contains the universe--if not in a grain of sand, then in one apartment house.',
            rating: '4'
        });

        const new_bookOne = new Book({
            title: 'The Serial',
            description: 'A Year in the Life of Marin County is a satirical novel about Marin County, California, written by Cyra McFadden. Beginning in 1976, the books chapters had been serialized in the Marin County',
            author: 'Cyra Mcfadden',
            reviews: 'Yes. If you want to hang loose and find your own space. Reconnect with and align your shakras then connect with this. A classic, it is as fresh today as it was over 30 years ago. Brilliant.',
            rating: '5'
        });

        const new_bookTwo = new Book({
            title: 'Epitaph for a Peach: Four Seasons on My Family Farm',
            description: 'A lyrical, sensuous and thoroughly engrossing memoir of one critical year in the life of an organic peach farmer, Epitaph for a Peach is "a delightful narrative. . . with poetic flair and a sense of humor". Line drawings',
            author: 'David Mas Masumoto',
            reviews: 'With poetic flair and a sense of humor, Masumoto offers. . . the joys and frustrations of raising peaches.',
            rating: '5'
        });

        //Mistake in title Should be "Season of the Witch"
        const new_bookThree = new Book({
            title: 'Seasoning of the Witch: Enchantment, Terror, and Deliverance in the City of Love',
            description: 'The book captures the dark history of San Francisco from the 1960s to the early 1980s utilizing a “kaleidoscopic narrative” and tells the story of how "the 1967 Summer of Love gave way to 20 or so winters of discontent."',
            author: 'David Talbot',
            reviews: '“A gritty corrective to our rosy memories…enthralling, news-driven history...smart and briskly paced tale... I found it hard to put down Season of the Witch." —San Francisco Chronicle',
            rating: '5'
        });

        // Fake book
        const new_bookFake = new Book({
            title: 'Tales of the Catcher',
            description: 'Tales of the Struggle life a kid lives while growing up',
            author: 'James Taylor',
            reviews: 'Dont even bother reading the book',
            rating: '2'
        });

                // Saving using promises
        let save_promise = new_book.save();
        // True or False if we are getting a promise back
        console.log('Is a Promise: ' + (save_promise instanceof Promise));
        save_promise 
            .then((save_book) => {
                console.log('ID: ' + saved_book._id);
                console.log(saved_book);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
        /*
        new_book.save((err, saved_book) => {
            if(err){
                return console.log('Error: ', err);
            }

            console.log('ID: ' + saved_book._id);
            console.log(saved_book);
        });*/
        new_bookOne.save((err, saved_bookOne) => {
            if(err){
                return console.log('Error: ', err);
            }

            console.log('ID: ' + saved_bookOne._id);
            console.log(saved_bookOne);
        });
        new_bookTwo.save((err, saved_bookTwo) => {
            if(err){
                return console.log('Error: ', err);
            }

            console.log('ID: ' + saved_bookTwo._id);
            console.log(saved_bookTwo);
        });
        new_bookThree.save((err, saved_bookThree) => {
            if(err){
                return console.log('Error: ', err);
            }

            console.log('ID: ' + saved_bookThree._id);
            console.log(saved_bookThree);
        });
        new_bookFake.save((err, saved_bookFake) => {
            if(err){
                return console.log('Error: ', err);
            }

            console.log('ID: ' + saved_bookFake._id);
            console.log(saved_bookFake);
        });
    }

    function sort_books(){
    //Sort books <<------------------------------->>
    let books_query = Book.find({});
        //Ascending<-- check
        console.log('TEST => Sorting books by author and title');
        books_query.sort({ title: 1, author: 1 });
        let find_promise = books_query.exec();
        console.log('Is a Promise: ' + (find_promise instanceof Promise));
        find_promise
            .then((books) => {
                books.map((book) => console.log(book.author + " " + book.title));
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    }
    //UPDATING book callback------->>>>
    function update_one_book(){
        console.log('TEST => Updating one user. Season of the Witch');
        //Season of the witch
        //need a console.log
        let book_id = '5eb88d08f21e3b5fa8719648';

        //Updating book Seasoning of the Witch to Season of the Witch
        Book.findOneAndUpdate(
            {_id: book_id},
            {title: 'Season of the Witch: Enchantment, Terror, and Deliverance in the City of Love'},
            {new: true},
            (err, updated_book) => {
                if(err){
                    return console.log('Error: ', err);
                }

                console.log(updated_book);
            }
        )
    }
    
//deleting fake book using book_id
    function delete_one_book(){
        console.log('TEST => Deleting one book');
        //Deleting Tales of The Catch Fake Book
        let book_id = '5eb88d08f21e3b5fa8719649';
        //let user_book = '';

        //Delete one user using callback
        /*User.findOneAndDelete(
            {_id: book_id},
            (err, deleted_book) => {
                if(err){
                    return console.log('Error: ', err);
                }
                console.log(deleted_book);
            }
        );*/

        //Delete one using promise
        let delete_promise = Book.findOneAndDelete({ _id: book_id}).exec();
        delete_promise
            .then((book) => {
                console.log('Deleted: ' + book);
            })
            .catch((err) => {
                console.log('Error: ', err);
            })
    }
