/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserSchemaZod from './user.validation';
import { User } from './user.model';

//! create user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const validatedData = UserSchemaZod.parse(user);
    await UserServices.createUserIntoDB(validatedData);
    const responseData = await User.aggregate([
      { $project: { orders: 0, password: 0 } },
    ]);
    res.status(201).json({
      success: 'true',
      message: 'User created successfully!',
      data: responseData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'User creation failed',
      error: error,
    });
  }
};

//! get all user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: 'true',
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'Users fetching failed',
      error: error,
    });
  }
};

//! get specific user
const getSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    await UserServices.getSpecificUserFromDB(userId);
    const responseData = await User.aggregate([
      { $project: { orders: 0, password: 0 } },
    ]);
    res.status(200).json({
      success: 'true',
      message: 'User fetched successfully!',
      data: responseData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'User fetching failed',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//! update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = req.body;
    const userId: string = req.params.userId;
    await UserServices.updateUserInDB(userId, updatedUser);
    const responseData = await User.aggregate([
      { $project: { orders: 0, password: 0 } },
    ]);
    res.status(200).json({
      success: 'true',
      message: 'Users updated successfully!',
      data: responseData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'User deletion failed',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//! delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: 'true',
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'User deletion failed',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSpecificUser,
  deleteUser,
  updateUser,
};
