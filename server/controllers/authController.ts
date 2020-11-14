import * as mongoose from 'mongoose';
import { userSchema } from '../models/user';
import { Request, Response } from 'express';
import { RequestHandler } from "express";
const User = mongoose.model('User', userSchema);
export class AuthController {
    signUp: RequestHandler = (req?: any, res?: any, next?: any) => {
        console.log('call me');
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        user.save((err, user) => {
            if (err) {
                res.send(err)
            }
            res.json(user)
        })
    }
}