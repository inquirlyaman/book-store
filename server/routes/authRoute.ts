import express, { Request as req, Response as res } from "express";
import { AuthController } from '../controllers/authController';
const authController = new AuthController();
export const authRouter = express.Router()
export class authRoute {
    public initRoutes(app: any): void {
        // app.route('/signup').post(authController.signUp)
        // app.route('/signin').post(authController.signIn)
    }
}

authRouter.post('/signup', authController.signUp)
authRouter.post('/signin', authController.signIn)
