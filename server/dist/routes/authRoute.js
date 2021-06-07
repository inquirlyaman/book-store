"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authController = new authController_1.AuthController();
exports.authRouter = express_1.default.Router();
class authRoute {
    initRoutes(app) {
        // app.route('/signup').post(authController.signUp)
        // app.route('/signin').post(authController.signIn)
    }
}
exports.authRoute = authRoute;
exports.authRouter.post('/signup', authController.signUp);
exports.authRouter.post('/signin', authController.signIn);
//# sourceMappingURL=authRoute.js.map