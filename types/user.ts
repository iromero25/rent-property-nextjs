import { Document } from "mongoose";
import { IProperty } from "./property";

export interface IUser {
  email: string;
  username: string;
  image?: string;
  bookmarks: IProperty[];
}

export interface IUserDocument extends IUser, Document {}
