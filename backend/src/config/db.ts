import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Critical error: MONGODB_URI environment variable is missing.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully via Mongoose");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

