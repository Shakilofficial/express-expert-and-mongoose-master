import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { routes } from './routes';

const app: Application = express();

// Middlewares
app.use(cors());

app.use(cookieParser());

app.use(express.json());

// API Routes Setup
app.use('/api/v1', routes);

// Health Check Endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    status: true,
    message: 'Server is live 🚀',
  });
});

// Fallback route (in case of undefined routes)
app.all('*', (req: Request, res: Response) => {
  res.status(404).send({
    status: false,
    message: '❌ Route not found ⚠️',
  });
});

export default app;
