import { RequestHandler } from 'express';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { bookSchema } from '../models/book';
import * as _ from 'lodash';
const Book = mongoose.model('Book', bookSchema);
export class BookController {
    addBooks: RequestHandler = (req?: any, res?: any, next?: any) => {
        console.log('>>', req.file);
        const title = req.body.title && req.body.title.trim();
        const author = req.body.author && req.body.author.trim();
        const publisher = req.body.publisher && req.body.publisher.trim();
        const price = req.body.price && req.body.price.trim();
        const description = req.body.description && req.body.description.trim();
        const category = req.body.category && req.body.category.trim();
        const cover = req.file.path;
        const book = new Book({
            title: title,
            description: description,
            author: author,
            publisher: publisher,
            category: category,
            cover: cover,
            price: price

        })
        book.save((err, book) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                })
            }
            return res.status(200).json({
                message: 'Book added successfully',
                book: book
            })
        })

    }
    getAllBooks: RequestHandler = (req?: any, res?: any, next?: any) => {
        const query = Book.find().select('title description price author cover');
        query.exec((err, doc) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                })
            }
            const newBooks = [];
            _.forEach(doc, (key, value) => {
                console.log(key);
                newBooks.push({
                    title: key.title,
                    price: key.price,
                    description: key.description,
                    cover: 'http://localhost:9000/' + key.cover,
                    author: key.author
                });
            })
            return res.status(200).json({
                message: 'successfully',
                books: newBooks
            })
        })
    }
}