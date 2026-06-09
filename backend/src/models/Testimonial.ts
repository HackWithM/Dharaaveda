import { Schema, model, Document, Types } from "mongoose";

export interface ITestimonial extends Document<string> {
  name: string;
  role: string;
  city?: string;
  content: string;
  image: string;
  rating: number;
  type: "export" | "wellness";
  approved: boolean;
  translations?: Record<string, any>;
}

const TestimonialSchema = new Schema<ITestimonial>({
  _id: { type: String },
  name: { type: String, required: true },
  role: { type: String, required: true },
  city: { type: String },
  content: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  type: { type: String, enum: ["export", "wellness"], required: true },
  approved: { type: Boolean, default: false },
  translations: { type: Schema.Types.Mixed, default: {} }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate string _id if missing
TestimonialSchema.pre("validate", function(next) {
  if (!this._id) {
    this._id = new Types.ObjectId().toHexString();
  }
  next();
});

TestimonialSchema.virtual("id").get(function(this: ITestimonial) {
  return this._id;
});

export const Testimonial = model<ITestimonial>("Testimonial", TestimonialSchema);
