import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';

// Route Imports
import { AuthRoutes } from './modules/auth/auth.routes';
import { PropertyRoutes } from './modules/property/property.routes';
import { CategoryRoutes } from './modules/category/category.routes';
import { RentalRoutes } from './modules/rental/rental.routes';
import { PaymentRoutes } from './modules/payment/payment.routes';
import { ReviewRoutes } from './modules/review/review.routes';
import { UserRoutes } from './modules/user/user.routes';

const app: Application = express();

app.use(cors({ origin: config.client_url, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Base API Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/properties', PropertyRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/rentals', RentalRoutes);
app.use('/api/payments', PaymentRoutes);
app.use('/api/reviews', ReviewRoutes);
app.use('/api/admin', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'RentNest API Active' });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;