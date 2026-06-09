import { Schema, model, Document, Types } from "mongoose";

export interface ITherapyService extends Document<string> {
  name: string;
  category: string;
  description: string;
  benefits: string[];
  duration: string;
  pricing: string;
  image: string;
  story: string;
  ctaText?: string;
  ctaLink?: string;
  highlight?: string;
  timeline: { title: string; description: string }[];
  translations?: Record<string, any>;
}

const TherapyServiceSchema = new Schema<ITherapyService>({
  _id: { type: String },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  benefits: [{ type: String }],
  duration: { type: String, required: true },
  pricing: { type: String, required: true },
  image: { type: String, required: true },
  story: { type: String, required: true },
  ctaText: { type: String },
  ctaLink: { type: String },
  highlight: { type: String },
  timeline: [{
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  translations: { type: Schema.Types.Mixed, default: {} }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate string _id if missing
TherapyServiceSchema.pre("validate", function(next) {
  if (!this._id) {
    this._id = new Types.ObjectId().toHexString();
  }
  next();
});

TherapyServiceSchema.virtual("id").get(function(this: ITherapyService) {
  return this._id;
});

export const TherapyService = model<ITherapyService>("TherapyService", TherapyServiceSchema);
