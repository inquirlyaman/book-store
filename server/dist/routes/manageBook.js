"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoute = void 0;
const bookController_1 = require("./../controllers/bookController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const bookController = new bookController_1.BookController();
class BookRoute {
    ManageBook(app) {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'upload/images');
            },
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}_ ${Date.now()}${path_1.default.extname(file.originalname)}`);
            }
        });
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        };
        const upload = multer_1.default({
            storage,
            limits: {
                fileSize: 1024 * 1024 * 5
            },
            fileFilter: fileFilter
        });
        app.route('/addBook').post(upload.single('cover'), bookController.addBooks);
        app.route('/books').get(bookController.getAllBooks);
    }
}
exports.BookRoute = BookRoute;
//# sourceMappingURL=manageBook.js.map