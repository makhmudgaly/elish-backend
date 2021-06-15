import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as cors from "cors";

class Api {
  public api: express.Application
  public app: express.Application

  constructor() {
    console.log("Start of express");
    this.firebaseSetup();
    this.app = express();
    this.api = express();
    this.config();
  }

  private config(): void {
    this.app.use(cors());
    this.api.use(bodyParser.json());
    this.api.use(bodyParser.urlencoded({extended: false}));
    this.api.use("/api/v1", routes);
  }

  private firebaseSetup(): void {
    admin.initializeApp({credential: admin.credential.applicationDefault()});
    admin.firestore().settings({timestampsInSnapshots: true});
  }
}
// webApi is your functions name, and you will pass this.api as a parameter

export const backend = functions.https.onRequest(new Api().api);
