import { IUser } from './user.interface';
import { User } from './user.model';

//! create user
const createUserIntoDB = async (userData: IUser) => {
  const createdUser = await User.create(userData);
  const result = await User.findOne({ userId: createdUser.userId }).select({
    _id: 0,
    password: 0,
    orders: 0,
  });
  return result;
};

//! get all userData
const getAllUserFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
    password: 0,
  });
  return result;
};

//! get specific user
const getSpecificUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId: userId }).select({
    password: 0,
    orders: 0,
    _id: 0,
  });

  return result;
};

//! update user
const updateUserInDB = async (userId: string, userData: IUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
    projection: { _id: 0, password: 0, orders: 0 },
  });
  return result;
};

//! delete user
const deleteUserFromDB = async (userId: string) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSpecificUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
