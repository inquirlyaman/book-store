
import express, { Application } from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';
import { authRoute, authRouter } from './routes/authRoute';
// import { BookRoute } from './routes/manageBook';
import mongoose = require("mongoose");
import { protectedApi } from "./routes/protectedApi";
import { isAuth } from "./middlewares/isAuth";
export class App {
  public app: Application;
  public publicRoutes: authRoute = new authRoute();
  // public bookRoutePrv: BookRoute = new BookRoute();
  public mongoUrl: string = "mongodb://localhost/bookDB";
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    // this.publicRoutes.initRoutes(this.app);
    // this.bookRoutePrv.ManageBook(this.app);
    this.app.use('/public', authRouter)
    this.app.use('/protected', isAuth, protectedApi)
  }
  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use('/public', express.static('public'))
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
  private mongoSetup(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, { useUnifiedTopology: true });
  }
}
