import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function start() {
  try {
    await mongoose.connect(config.MONGODB_URI as string);
    console.log('Connected to MongoDB');
    app.listen(config.PORT, () => {
      console.log(`App listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
