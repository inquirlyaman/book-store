import { RequestHandler, Request, Response } from 'express';
import { ResponseUtil } from '../share/utilService';
import { Book } from '../models/book';
import * as _ from 'lodash';
const responseUtil = new ResponseUtil();
export class BookService {
    addBooks: RequestHandler = (req?: Request, res?: Response, next?: any) => {
        const url = req.protocol + '://' + req.get('host')
        const formdata: any = _.pick(req.body, ['title', 'author', 'publisher', 'price', 'description', 'category',
            'price']);
        formdata['cover'] = url + '/public/' + req.file.filename
        formdata['active'] = true;
        console.log(formdata);
        const book = new Book(formdata)
        book.save((err, book) => {
            if (err) {
                const data = {
                    error: 'An error occurred',
                    errMsg: 'Internal server error',
                    errorCode: 500
                }
                responseUtil.getErrorResponse(res, data);
            }
            const data = {
                title: 'Book creattion',
                sucessMsg: 'Book created successfully',
                statusCode: 200
            }
            responseUtil.successResponse(res, data);
        })
    }
    deleteBookById: RequestHandler = (req?: any, res?: any, next?: any) => {
        const bookId = req.body.bookId;
        Book.findById(bookId, (err, book) => {
            if (err) {
                const data = {
                    error: 'An error occurred',
                    errMsg: 'Internal server error',
                    errorCode: 500
                }
                responseUtil.getErrorResponse(res, data);
            }
            console.log(book);
            if (book) {
                book.active = false;
                book.save((err, book) => {
                    const data = {
                        title: 'Book Deletation ',
                        sucessMsg: 'Book deleted successfully',
                        statusCode: 200
                    }
                    responseUtil.successResponse(res, data);
                });
            }
        })
    }
    getAllBooks: RequestHandler = (req?: any, res?: any, next?: any) => {
        const query = Book.find().select('title description price author cover active ');
        query.exec((err, doc) => {
            if (err) {
                const data = {
                    error: 'An error occurred',
                    errMsg: 'Internal server error',
                    errorCode: 500
                }
                responseUtil.getErrorResponse(res, data);
            }
            const newBooks = [];
            _.forEach(doc, (key, value) => {
                console.log(key)
                if (key.active) {
                    newBooks.push({
                        id: key._id,
                        title: key.title,
                        price: key.price,
                        description: key.description,
                        cover: key.cover,
                        author: key.author
                    });
                }

            })
            const data = {
                title: 'Get All Book',
                sucessMsg: 'Get All Book successfully',
                statusCode: 200,
                books: newBooks
            }
            responseUtil.successResponse(res, data);
        })
    }
}