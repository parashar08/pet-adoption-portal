import mongoose from 'mongoose';

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('DB CONNECTION ERROR!', error);
    process.exit(1);
  }
}

export default connectDB;
