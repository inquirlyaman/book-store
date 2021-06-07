import express, { Request as req, Response as res } from "express";
import { UserController } from '../controllers/userController';
const authController = new UserController();


export const userRouter = express.Router()

userRouter.put('/update-roles', authController.updateRoles)