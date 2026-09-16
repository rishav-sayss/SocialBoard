import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';
import path from 'path';
import imageRoutes from './routes/PostRoutes';
// ─── Routes ───────────────────────────────────────────────────────────────────
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from "./routes/userRoutes";
import likeRoutes from './routes/likeRoutes';
import commentRoutes from './routes/commentRoutes';
const app: Application = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

connectDB()

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, message: '🚀 SocialBoard API is running!' });
});

// Make uploads folder publicly accessible
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'uploads'))
);


// Image & Post Routes
app.use('/api/images', imageRoutes);
app.use('/api/images', likeRoutes);
app.use('/api/images', commentRoutes);

app.use('/api/posts', likeRoutes);
app.use('/api/posts', commentRoutes);

app.use('/api/comments', commentRoutes);

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users',  userRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

export default app;
