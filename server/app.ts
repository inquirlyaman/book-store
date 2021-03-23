
import express, { Application } from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';
import { authRoute } from './routes/authRoute';
import { BookRoute } from './routes/manageBook';
import mongoose = require("mongoose");
export class App {
  public app: Application;
  public routePrv: authRoute = new authRoute();
  public bookRoutePrv: BookRoute = new BookRoute();
  public mongoUrl: string = "mongodb://localhost/bookDB";
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.routePrv.initRoutes(this.app);
    this.bookRoutePrv.ManageBook(this.app);
  }
  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use( (req, res, next)=> {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      next();
    });
  }
  private mongoSetup(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }
}
