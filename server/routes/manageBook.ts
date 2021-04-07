import { BookController } from './../controllers/bookController';
import { Request as req, Response as res } from "express";
import multer from 'multer';
import path from 'path';
const bookController = new BookController();
export class BookRoute {
    public ManageBook(app) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'upload/images');
            },
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}_ ${Date.now()}${path.extname(file.originalname)}`);
            }
        });
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
        const upload = multer({
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