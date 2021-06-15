import {CollectionReference, DocumentData, DocumentReference,
  DocumentSnapshot} from "@google-cloud/firestore";
import * as admin from "firebase-admin";
import IFirestoreRepository from "./interfaces/firestore.interface";

/**
 * Interface for Firestore Repository
 */
export default class FirestoreRepository implements IFirestoreRepository {
    /**
     *
     */
    public readonly collection: CollectionReference;

    /**
     * Class contructor
     * @param {string} collectionName - Firestore collection name
     */
    constructor(collectionName: string) {
      this.collection = admin.firestore().collection(collectionName);
    }

    /**
     * Create object in collection
     * @param {DocumentData} object - firestore document to be created
     * @return {DocumentReference} firestore document
     */
    public async create(object: DocumentData): Promise<DocumentReference> {
      try {
        return await this.collection.add(object);
      } catch {
        throw new Error("Could not create object");
      }
    }

    /**
     * Get document in collection by id
     * @param {string} id - id of firestore document
     * @return {DocumentReference} document
     */
    public async readOne(id: string): Promise<DocumentReference> {
      try {
        return await this.collection.doc(id);
      } catch {
        throw new Error("Could not read object");
      }
    }

    /**
     * Get all documents in collection
     * @return {[DocumentReference]} - documents in collection
     */
    public async readAll(): Promise<DocumentReference[]> {
      try {
        return await this.collection.listDocuments();
      } catch {
        throw new Error("Could not read all objects");
      }
    }

    /**
     * Update document by id
     * @param {string} id - id of document
     * @param {DocumentData} object - data to be updated
     * @return {DocumentReference} - updated document
     */
    public async update(id:string, object: DocumentData): Promise<DocumentReference> {
      try {
        const ref: DocumentReference = this.collection.doc(id);
        const snap: DocumentSnapshot = await ref.get();
        if (!snap.exists) {
          return ref;
        }
        await ref.update(object);
        return ref;
      } catch {
        throw new Error("Could not update object");
      }
    }

    /**
     * Delete document by id
     * @param {string} id - id of document
     * @return {DocumentReference} - document reference of deleted document
     */
    public async delete(id: string): Promise<DocumentReference> {
      try {
        const ref: DocumentReference = this.collection.doc(id);
        await ref.delete();
        return ref;
      } catch {
        throw new Error("Could not remove object");
      }
    }
}
