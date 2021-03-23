"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const userService_1 = require("../services/userService");
const userService = new userService_1.UserService();
class AuthController {
    constructor() {
        this.signUp = (req, res, next) => {
            try {
                const user = userService.addUser(req, res);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.signIn = (req, res, next) => {
            try {
                const user = userService.getUser(req, res);
            }
            catch (error) {
                console.log(error);
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map