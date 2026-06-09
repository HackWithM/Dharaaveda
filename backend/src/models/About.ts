import { Schema, model, Document, Types } from "mongoose";

export interface IAboutContent extends Document<string> {
  aboutText: string;
  philosophy: string;
  profileImage: string;
  name: string;
  role: string;
  showReviews: boolean;
  showAbout: boolean;
  translations?: Record<string, any>;
}

const AboutContentSchema = new Schema<IAboutContent>({
  _id: { type: String },
  aboutText: { type: String, required: true },
  philosophy: { type: String, required: true },
  profileImage: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  showReviews: { type: Boolean, default: true },
  showAbout: { type: Boolean, default: true },
  translations: { type: Schema.Types.Mixed, default: {} }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate string _id if missing
AboutContentSchema.pre("validate", function(next) {
  if (!this._id) {
    this._id = new Types.ObjectId().toHexString();
  }
  next();
});

AboutContentSchema.virtual("id").get(function(this: IAboutContent) {
  return this._id;
});

export const AboutContent = model<IAboutContent>("AboutContent", AboutContentSchema);
