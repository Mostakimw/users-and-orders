import { Model } from 'mongoose';

// name interface
export interface IFullName {
  firstName: string;
  lastName: string;
}

// address interface
export interface IAddress {
  street: string;
  city: string;
  country: string;
}

// order interface
export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

// User interface
export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: 'active' | 'inactive';
  hobbies: string[];
  address: IAddress;
  orders: IOrder[];
}

//! method for user exists or not
export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<IUser | null>;
}
