"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedApi = void 0;
const express_1 = __importDefault(require("express"));
const isAuth_1 = require("../middlewares/isAuth");
const manageBook_1 = require("./manageBook");
const userRoute_1 = require("./userRoute");
exports.protectedApi = express_1.default.Router();
exports.protectedApi.use('/book', manageBook_1.manageBookRouter);
exports.protectedApi.use('/user', isAuth_1.isAdmin, userRoute_1.userRouter);
//# sourceMappingURL=protectedApi.js.map