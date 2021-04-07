"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("./routes/authRoute");
const manageBook_1 = require("./routes/manageBook");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.routePrv = new authRoute_1.authRoute();
        this.bookRoutePrv = new manageBook_1.BookRoute();
        this.mongoUrl = "mongodb://localhost/bookDB";
        this.app = express_1.default();
        this.config();
        this.mongoSetup();
        this.routePrv.initRoutes(this.app);
        this.bookRoutePrv.ManageBook(this.app);
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/upload/images', express_1.default.static('upload/images'));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
            res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
            next();
        });
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map