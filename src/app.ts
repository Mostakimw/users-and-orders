import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/users/user.routes';
import { OrderRoutes } from './modules/orders/order.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', UserRoutes);
app.use('/api/users', OrderRoutes);

export default app;
