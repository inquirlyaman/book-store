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
exports.BookController = void 0;
const mongoose = __importStar(require("mongoose"));
const book_1 = require("../models/book");
const bookService_1 = require("../services/bookService");
const Book = mongoose.model('Book', book_1.bookSchema);
const bookService = new bookService_1.BookService();
class BookController {
    constructor() {
        this.addBooks = (req, res, next) => {
            try {
                const user = bookService.addBooks(req, res, next);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.getAllBooks = (req, res, next) => {
            try {
                const user = bookService.getAllBooks(req, res, next);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.deleteBookById = (req, res, next) => {
            try {
                const user = bookService.deleteBookById(req, res, next);
            }
            catch (error) {
                console.log(error);
            }
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=bookController.js.map