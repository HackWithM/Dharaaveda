import mongoose from "mongoose";
import { TherapyService } from "./src/models/Service";
import dotenv from "dotenv";

dotenv.config();

async function check() {
  const uri = process.env.MONGODB_URI;
  console.log("Connecting to:", uri);
  await mongoose.connect(uri!);
  console.log("Connected.");
  
  const services = await TherapyService.find({});
  console.log("Services in DB:");
  console.log(JSON.stringify(services, null, 2));
  
  await mongoose.disconnect();
}

check().catch(console.error);
