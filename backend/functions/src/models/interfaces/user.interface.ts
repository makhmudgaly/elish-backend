import {Timestamp} from "@google-cloud/firestore";

interface IUser {
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
    birthday?: Timestamp
}
export default IUser;
