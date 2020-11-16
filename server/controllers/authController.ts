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
    signIn: RequestHandler = (req?: any, res?: any, next?: any) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!user) {
                return res.status(401).json({
                    title: 'Login failed',
                    error: { message: 'Invalid login credentials' }
                })
            } else {
                return res.status(200).json({
                    message: 'Successfully logged in',
                    user: user
                })
            }
        })
    }
}