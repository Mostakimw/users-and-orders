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

//! calculate total price
const getTotalPriceForSingleUserFromDB = async (userId: string) => {
  const existingUser = (await User.isUserExists(userId)) as IUser;

  if (!existingUser) {
    throw new Error('User not found');
  }

  if (!existingUser.orders || existingUser.orders.length === 0) {
    return 0;
  }
  const totalPrice = calculateTotalPrice(existingUser.orders);
  return totalPrice;
};

//! function for calculate total price
const calculateTotalPrice = (orders: IOrder[]): number => {
  let totalPrice = 0;
  for (const order of orders) {
    const { price, quantity } = order;
    totalPrice += price * quantity;
  }
  return parseInt(totalPrice.toFixed(2));
};

export const OrderServices = {
  createOrderIntoDB,
  getSingleUserOrdersFromDB,
  getTotalPriceForSingleUserFromDB,
};
