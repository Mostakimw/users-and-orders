import { IUser } from './user.interface';
import { User } from './user.model';

//! create user
const createUserIntoDB = async (userData: IUser) => {
  const result = await User.create(userData);
  return result;
};

//! get all userData
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
