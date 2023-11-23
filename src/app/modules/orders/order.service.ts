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
  try {
    const existingUser = await User.isUserExists(userId);

    if (!existingUser) {
      throw new Error('User not found');
    }

    // calculate total price using aggregate
    const totalPrice = await User.aggregate([
      {
        $match: { userId: existingUser.userId },
      },
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: '$userId',
          totalPrice: {
            $sum: {
              $multiply: ['$orders.price', '$orders.quantity'],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1,
        },
      },
    ]);

    if (totalPrice.length === 0) {
      return 0;
    }

    return totalPrice[0].totalPrice;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error calculating total price: ${error.message}`);
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getSingleUserOrdersFromDB,
  getTotalPriceForSingleUserFromDB,
};
