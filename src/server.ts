import app from './app';
import config from './app/config';
import { connectDB } from './app/config/db';

const start = async (): Promise<void> => {
  try {
    // Connect to the database first
    await connectDB();

    // Once the DB is connected, start the Express server
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port} 🏃🏽‍♂️➡️`);
    });
  } catch (error) {
    console.error('🚨 Failed to start the server ❌', error);
    process.exit(1); // Exit with error code
  }
};

start();
