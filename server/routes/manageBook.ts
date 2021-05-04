import { BookController } from './../controllers/bookController';
import { Request as req, Response as res } from "express";
import multer from 'multer';
import path from 'path';
const bookController = new BookController();
export class BookRoute {
    public ManageBook(app) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public');
            },
            filename: (req, file, cb) => {
                console.log('call me ');
                cb(null, `${file.fieldname}_ ${Date.now()}${path.extname(file.originalname)}`);
            }
        });
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                cb(null, true)
            } else {
                cb(null, false)
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
        const upload = multer({
            storage,
            limits: {
                fileSize: 1024 * 1024 * 5
            },
            fileFilter: fileFilter
        });

        app.route('/add-book').post(upload.single('cover'), bookController.addBooks);
        app.route('/getAllBooks').get(bookController.getAllBooks)
        app.route('/deleteBook').post(bookController.deleteBookById);;
    }
}