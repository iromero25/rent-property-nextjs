import { IProperty } from "./property";
import { IUser } from "./user";

export interface IMessageDocument {
  _id: string;
  sender: IUser;
  recipient: IUser;
  property: IProperty;

  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;

  createdAt: Date;
  updatedAt: Date;
}
