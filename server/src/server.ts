import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n✅ Server running in ${process.env.NODE_ENV} mode`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
  });
});
