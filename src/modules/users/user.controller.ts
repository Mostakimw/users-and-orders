/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserSchemaZod from './user.validation';

//! create user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const validatedData = UserSchemaZod.parse(user);
    const result = await UserServices.createUserIntoDB(validatedData);
    res.status(201).json({
      success: 'true',
      message: 'User created successfully!',
      data: result,
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
      message: error.message || 'User fetching failed',
      error: error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
};