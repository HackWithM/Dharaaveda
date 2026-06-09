import { Schema, model, Document, Types } from "mongoose";

export interface IInquiry extends Document<string> {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productName?: string;
  quantity?: string;
  message: string;
  status: "new" | "reviewed" | "resolved";
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>({
  _id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  company: { type: String, default: "" },
  productName: { type: String, default: "" },
  quantity: { type: String, default: "" },
  message: { type: String, required: true },
  status: { type: String, enum: ["new", "reviewed", "resolved"], default: "new" },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate string _id if missing
InquirySchema.pre("validate", function(next) {
  if (!this._id) {
    this._id = new Types.ObjectId().toHexString();
  }
  next();
});

InquirySchema.virtual("id").get(function(this: IInquiry) {
  return this._id;
});

export const Inquiry = model<IInquiry>("Inquiry", InquirySchema);
