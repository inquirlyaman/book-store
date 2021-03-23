"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoute = void 0;
const bookController_1 = require("./../controllers/bookController");
const bookController = new bookController_1.BookController();
class BookRoute {
    ManageBook(app) {
        app.route('addBook').post(bookController.addBooks);
        app.route('books').get(bookController.getAllBooks);
    }
}
exports.BookRoute = BookRoute;
//# sourceMappingURL=manageBook.js.map