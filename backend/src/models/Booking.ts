import { Schema, model, Document, Types } from "mongoose";

export interface IBooking extends Document<string> {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  amount: number;
  paymentStatus: "pending" | "paid" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  _id: { type: String },
  bookingId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: { type: String, default: "" },
  amount: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate string _id if missing
BookingSchema.pre("validate", function(next) {
  if (!this._id) {
    this._id = new Types.ObjectId().toHexString();
  }
  next();
});

BookingSchema.virtual("id").get(function(this: IBooking) {
  return this._id;
});

export const Booking = model<IBooking>("Booking", BookingSchema);
