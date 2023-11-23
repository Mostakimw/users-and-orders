import { IUser } from './user.interface';
import { User } from './user.model';

//! create user
const createUserIntoDB = async (userData: IUser) => {
  const result = await User.create(userData);
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
  });
  return result;
};

//! get specific user
const getSpecificUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId });
  return result;
};

//! update user
const updateUserInDB = async (userId: number, userData: IUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User not found');
  }
  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

//! delete user
const deleteUserFromDB = async (userId: number) => {
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
