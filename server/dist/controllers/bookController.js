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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const mongoose = __importStar(require("mongoose"));
const book_1 = require("../models/book");
const Book = mongoose.model('Book', book_1.bookSchema);
class BookController {
    constructor() {
        this.addBooks = (req, res, next) => {
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
            });
            book.save((err, book) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                return res.status(200).json({
                    message: 'Book added successfully',
                    book: book
                });
            });
        };
        this.getAllBooks = (req, res, next) => {
            Book.find((err, book) => {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                return res.status(200).json({
                    message: 'successfully',
                    books: book
                });
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=bookController.js.map