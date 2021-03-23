"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const authController_1 = require("../controllers/authController");
const authController = new authController_1.AuthController();
class authRoute {
    initRoutes(app) {
        app.route('/signup').post(authController.signUp);
        app.route('/signin').post(authController.signIn);
    }
}
exports.authRoute = authRoute;
//# sourceMappingURL=authRoute.js.map