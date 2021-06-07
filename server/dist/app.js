"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("./routes/authRoute");
const mongoose = require("mongoose");
const protectedApi_1 = require("./routes/protectedApi");
const isAuth_1 = require("./middlewares/isAuth");
class App {
    constructor() {
        this.publicRoutes = new authRoute_1.authRoute();
        this.mongoUrl = "mongodb://localhost/bookDB";
        this.app = express_1.default();
        this.config();
        this.mongoSetup();
        this.app.use('/public', authRoute_1.authRouter);
        this.app.use('/protected', isAuth_1.isAuth, protectedApi_1.protectedApi);
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/public', express_1.default.static('public'));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization");
            res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
            next();
        });
        this.app.use((error, req, res, next) => {
            console.log(error);
            const status = error.statusCode || 500;
            const message = error.message;
            const data = error.data;
            res.status(status).json({ message: message, data: data });
        });
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, { useUnifiedTopology: true });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map