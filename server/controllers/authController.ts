import * as mongoose from 'mongoose';
import { User } from '../models/user';
import {UserService} from '../services/userService';
import { Request, Response } from 'express';
import { RequestHandler } from "express";
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
const userService = new UserService();
export class AuthController {
    signUp: RequestHandler = (req?: any, res?: any, next?: any) => {
        try {
            const user = userService.addUser(req,res);
        } catch (error) {
            console.log(error);
        }
    }
    signIn: RequestHandler = (req?: any, res?: any, next?: any) => {
        try {
            const user = userService.getUser(req,res);
        } catch (error) {
            console.log(error);
        }
    }
}