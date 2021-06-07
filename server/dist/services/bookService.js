"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const utilService_1 = require("../share/utilService");
const book_1 = require("../models/book");
const _ = __importStar(require("lodash"));
const responseUtil = new utilService_1.ResponseUtil();
class BookService {
    constructor() {
        this.addBooks = (req, res, next) => {
            const url = req.protocol + '://' + req.get('host');
            const formdata = _.pick(req.body, ['title', 'author', 'publisher', 'price', 'description', 'category',
                'price']);
            formdata['cover'] = url + '/public/' + req.file.filename;
            formdata['active'] = true;
            console.log(formdata);
            const book = new book_1.Book(formdata);
            book.save((err, book) => {
                if (err) {
                    const data = {
                        error: 'An error occurred',
                        errMsg: 'Internal server error',
                        errorCode: 500
                    };
                    responseUtil.getErrorResponse(res, data);
                }
                const data = {
                    title: 'Book creattion',
                    sucessMsg: 'Book created successfully',
                    statusCode: 200
                };
                responseUtil.successResponse(res, data);
            });
        };
        this.deleteBookById = (req, res, next) => {
            const bookId = req.body.bookId;
            book_1.Book.findById(bookId, (err, book) => {
                if (err) {
                    const data = {
                        error: 'An error occurred',
                        errMsg: 'Internal server error',
                        errorCode: 500
                    };
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
                        };
                        responseUtil.successResponse(res, data);
                    });
                }
            });
        };
        this.getAllBooks = (req, res, next) => {
            const query = book_1.Book.find().select('title description price author cover active ');
            query.exec((err, doc) => {
                if (err) {
                    const data = {
                        error: 'An error occurred',
                        errMsg: 'Internal server error',
                        errorCode: 500
                    };
                    responseUtil.getErrorResponse(res, data);
                }
                const newBooks = [];
                _.forEach(doc, (key, value) => {
                    console.log(key);
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
                });
                const data = {
                    title: 'Get All Book',
                    sucessMsg: 'Get All Book successfully',
                    statusCode: 200,
                    books: newBooks
                };
                responseUtil.successResponse(res, data);
            });
        };
    }
}
exports.BookService = BookService;
//# sourceMappingURL=bookService.js.map