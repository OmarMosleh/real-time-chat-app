import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb connected : ${conn.connection.host}`);
    // Don't forget to configure security to allow access from any where 
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};
