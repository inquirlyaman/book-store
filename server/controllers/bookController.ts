import { RequestHandler } from 'express';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { bookSchema } from '../models/book';
export class BookController {
    addBooks: RequestHandler = (req?: any, res?: any, next?: any) => {
        console.log('call me');
    }
}