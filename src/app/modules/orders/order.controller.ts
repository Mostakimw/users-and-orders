/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import OrderSchemaZod from './order.validation';

//! create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;
    const validatedOrderData = OrderSchemaZod.parse(orderData);
    await OrderServices.createOrderIntoDB(userId, validatedOrderData);
    res.status(201).json({
      success: 'true',
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'Order creation failed',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//! get single user orders
const getSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await OrderServices.getSingleUserOrdersFromDB(userId);
    res.status(201).json({
      success: 'true',
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'Order fetching failed',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//! get total price for user
const getTotalPriceForSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await OrderServices.getTotalPriceForSingleUserFromDB(userId);
    res.status(201).json({
      success: 'true',
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'false',
      message: error.message || 'User not found',
      error: {
        code: 500,
        description: 'User not found',
      },
    });
  }
};

export const OrderControllers = {
  createOrder,
  getSingleUserOrders,
  getTotalPriceForSingleUser,
};
