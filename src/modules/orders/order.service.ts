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

export const OrderServices = {
  createOrderIntoDB,
};
