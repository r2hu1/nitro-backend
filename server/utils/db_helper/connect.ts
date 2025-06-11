import mongoose from "mongoose";
const { connect } = mongoose;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MongoDB connection URI is not defined");
    }
    await connect(process.env.MONGO_URI);
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1);
  }
};

export default connectDB;
