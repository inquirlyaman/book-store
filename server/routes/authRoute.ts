import { Request as req, Response as res } from "express";
import { AuthController } from '../controllers/authController';
const authController = new AuthController();
export class authRoute {
    public initRoutes(app: any): void {
        app.route('/sign-up').post(authController.signUp)
    }
}
