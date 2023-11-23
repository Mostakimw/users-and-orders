import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

//! order schema
const orderSchema = new Schema({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

export const Order = model<IOrder>('Order', orderSchema);
