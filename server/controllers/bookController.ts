import { RequestHandler } from 'express';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { bookSchema } from '../models/book';
const Book = mongoose.model('Book', bookSchema);
export class BookController {
    addBooks: RequestHandler = (req?: any, res?: any, next?: any) => {
        const title = req.body.title && req.body.title.trim();
        const author = req.body.author && req.body.author.trim();
        const publisher = req.body.publisher && req.body.publisher.trim();
        const price = req.body.price && req.body.price.trim();
        const description = req.body.description && req.body.description.trim();
        const cover = req.body.cover && req.body.cover.trim();
        const book = new Book({
            title: title,
            description: description,
            author: author,
            publisher: publisher,
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
        Book.find((err, book) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                })
            }
            return res.status(200).json({
                message: 'successfully',
                books: book
            })
        })
    }
}