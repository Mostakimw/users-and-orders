import { Document } from 'mongoose';
import { User } from '../users/user.model';
import { IOrder } from './order.interface';
import { IUser } from '../users/user.interface';

//! create order in db
const createOrderIntoDB = async (userId: string, orderData: IOrder) => {
  const existingUser = (await User.isUserExists(userId)) as Document & IUser;
  // checking existing user
  if (existingUser === null) {
    throw new Error('User not found');
  }
  //checking existing user orders
  if (!existingUser.orders) {
    existingUser.orders = [];
  }

  existingUser.orders.push(orderData);
  await existingUser.save();
  return existingUser;
};

//! get specific user orders
const getSingleUserOrdersFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId }).select({ _id: 0, orders: 1 });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getSingleUserOrdersFromDB,
};
