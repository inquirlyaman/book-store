import { RequestHandler } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { Request, Response } from 'express';
import { bookSchema } from '../models/book';
import { BookService } from '../services/bookService';
const Book = mongoose.model('Book', bookSchema);
const bookService = new BookService();
export class BookController {
    addBooks: RequestHandler = (req?: any, res?: any, next?: any) => {
        try {
            const user = bookService.addBooks(req, res, next);
        } catch (error) {
            console.log(error);
        }
    }
    getAllBooks: RequestHandler = (req?: any, res?: any, next?: any) => {
        try {
            const user = bookService.getAllBooks(req, res, next);
        } catch (error) {
            console.log(error);
        }
    }
    deleteBookById: RequestHandler = (req?: any, res?: any, next?: any) => {
        try {
            const user = bookService.deleteBookById(req, res, next);
        } catch (error) {
            console.log(error);
        }
    }
}