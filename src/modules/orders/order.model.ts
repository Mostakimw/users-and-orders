import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

//! order schema
const orderSchema = new Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
  },
});

export const Order = model<IOrder>('Order', orderSchema);
