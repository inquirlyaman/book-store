"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authController = new userController_1.UserController();
exports.userRouter = express_1.default.Router();
exports.userRouter.put('/update-roles', authController.updateRoles);
//# sourceMappingURL=userRoute.js.map