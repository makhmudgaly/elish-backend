import {DocumentData, DocumentSnapshot} from "@google-cloud/firestore";
import {NextFunction, Request, Response} from "express";
import FirestoreRepository from "../repositories/firestore.repository";
import CustomError from "../utils/error.interface";
import IController from "./interfaces/controller.interface";

export default class Controller implements IController {
    private repository: FirestoreRepository;

    constructor(collectionName: string) {
      this.repository = new FirestoreRepository(collectionName);
    }

    /**
     * Create a document in Firestore collection using the DocumentData received in the request body.
     * @param {Request} req The request received by the API
     * @param {Response} res The response sent by the API
     * @param {NextFunction} next The next function executed in the app's middleware
     * @return {DocumentData|undefined} created resource data
     */
    public create(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
      let data: DocumentData | undefined;
      if (req.body == null) {
        const err: CustomError = new Error("The body is empty or undefined") as CustomError;
        err.status = 400;
        next(err);
        return;
      }

      this.repository.create(req.body)
        .then((value) => {
          res.status(200).send(value.get()
            .then((document) => {
              if (document.data()) {
                data = document.data();
              }
              return data;
            }));
        }).catch((reason) => {
          next(reason);
        });
      return data;
    }

    /**
     * Read one document by the given id.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    public readOne(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
      if (req.params.id == null) {
        const err: CustomError = new Error("The id was undefined") as CustomError;
        err.status = 400;
        next(err);
        return;
      }
      this.repository.readOne(req.params.id)
        .then(async (value) => {
          res.status(200).send((await value.get()).data());
        })
        .catch((reason) => {
          next(reason);
        });
      return;
    }

    /**
     * Read all documents available in the Firestore collection.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    public readAll(req: Request, res: Response, next: NextFunction): DocumentData[] | undefined {
      let dataArray: DocumentData[];
      let allPromises: Array<Promise<DocumentSnapshot>>;
      this.repository.readAll()
        .then(async (list) => {
          if (list.length === 0) {
            const err: CustomError = new Error("The list of entities was empty") as CustomError;
            err.status = 204;
            next(err);
            return;
          }
          allPromises = new Array<Promise<DocumentSnapshot>>();
          list.forEach(async (item) => {
            allPromises.push(item.get());
          });
          Promise.all(allPromises).then(async (promises) => {
            dataArray = new Array<DocumentData>();
            promises.forEach(async (promise) => {
              dataArray.push(promise.data() as DocumentData);
            });
            res.status(200).send(dataArray);
            return dataArray;
          });
        })
        .catch((reason) => {
          next(reason);
        });
      return;
    }

    /**
     * Update document fields by the given id.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    public update(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
      if (req.body == null) {
        const err: CustomError = new Error("The body is empty or undefined") as CustomError;
        err.status = 400;
        next(err);
        return;
      }

      if (req.params.id == null) {
        const err: CustomError = new Error("The id was undefined") as CustomError;
        err.status = 400;
        next(err);
        return;
      }

      this.repository.update(req.params.id, req.body)
        .then(async (value) => {
          res.status(200).send((await value.get()).data());
        })
        .catch((reason) => {
          next(reason);
        });
      return;
    }

    /**
     * Delete document by the given id
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    public delete(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
      if (req.params.id == null) {
        const err: CustomError = new Error("The id was undefined") as CustomError;
        err.status = 400;
        next(err);
        return;
      }

      this.repository.delete(req.params.id)
        .then(() => {
          res.status(200).send("The object was deleted.");
        }).catch((reason) => {
          next(reason);
        });

      return;
    }
}
