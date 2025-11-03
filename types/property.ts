import { Schema } from "mongoose";

export type PropertyLocation = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

export type PropertyType =
  | "Apartment"
  | "Condo"
  | "Cottage Or Cabin"
  | "Studio"
  | "House"
  | "Chalet";

export type PropertyRates = {
  nightly?: number;
  weekly?: number;
  monthly?: number;
};

export type SellerInfo = {
  name: string;
  email: string;
  phone: string;
};

export interface IProperty {
  _id: string;
  owner: Schema.Types.ObjectId;
  name: string;
  type: PropertyType;
  description: string;
  location: PropertyLocation;
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: PropertyRates;
  seller_info: SellerInfo;
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}
