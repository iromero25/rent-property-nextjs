import { IUser } from "./user";
import { IProperty } from "./property";

export interface IMessage {
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
