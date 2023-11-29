import express from 'express';
import { OrderControllers } from './order.controller';
const router = express.Router();

router.put('/:userId/orders', OrderControllers.createOrder);
router.get('/:userId/orders', OrderControllers.getSingleUserOrders);
router.get(
  '/:userId/orders/total-price',
  OrderControllers.getTotalPriceForSingleUser,
);

export const OrderRoutes = router;
