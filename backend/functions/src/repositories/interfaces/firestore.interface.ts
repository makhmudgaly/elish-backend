import {DocumentData, DocumentReference} from "@google-cloud/firestore";

interface IFirestoreRepository {
    create(object: DocumentData): Promise<DocumentReference>;
}

export default IFirestoreRepository;
