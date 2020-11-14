import * as express from "express";
import * as bodyParser from "body-parser";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    // this.mongoSetup();
  }
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }
  // private mongoSetup(): void {
  //   (<any>mongoose).Promise = global.Promise;
  //   mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  // }
}
