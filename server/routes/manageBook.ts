import { BookController } from './../controllers/bookController';
import { Request as req, Response as res } from "express";
const bookController = new BookController();
export class BookRoute {
    public ManageBook(app) {
        app.route('addBook').post(bookController.addBooks);
    }
}