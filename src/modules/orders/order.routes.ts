import express from 'express';
import { OrderControllers } from './order.controller';
const router = express.Router();

router.post('/:userId/orders', OrderControllers.createOrder);
router.get('/:userId/orders', OrderControllers.getSingleUserOrders);

export const OrderRoutes = router;
