/* eslint-disable require-jsdoc */
import {Timestamp} from "@google-cloud/firestore";
import {IsString, IsNotEmpty, IsAlpha, IsEmail} from "class-validator";
import IExample from "./interfaces/user.interface";

export default class User implements IExample {
    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    public firstname?: string;

    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    public lastname?: string;

    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    @IsEmail()
    public email?: string;

    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    public password?: string;

    @IsNotEmpty()
    public birthday?: Timestamp;
}

