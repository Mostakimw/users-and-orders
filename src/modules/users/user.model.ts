import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

//! full name schema
const fullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: 20,
  },
});

//! address schema
const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

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

//! user schema
const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
    maxlength: 20,
  },
  username: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: true,
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  hobbies: {
    type: [String],
  },
  address: addressSchema,
  orders: {
    type: [orderSchema],
  },
});

//! middleware for hashing and hiding password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
//! saving password as hash
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//! exclude password
userSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model<IUser>('User', userSchema);
