import { Model } from "mongoose";

export interface IUserName {
  firstName: string;
  lastName: string;
}

export interface IUserAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface IUser {
  name: IUserName;
  age: number;
  email: string;
  password: string;
  phone?: string | null;
  photo?: string | null;
  address?: IUserAddress;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
}

export interface IUserModel extends Model<IUser> {
    isUserExists(email: string): Promise<IUser | null>;
  }