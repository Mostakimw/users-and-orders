import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/users/user.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/users', UserRoutes);

export default app;
