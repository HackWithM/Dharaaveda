import { Schema, model, Document, Types } from "mongoose";

export interface IScreenshotReview extends Document<string> {
  imageUrl: string;
  caption: string;
  platform: "whatsapp" | "instagram";
  translations?: Record<string, any>;
}

const ScreenshotReviewSchema = new Schema<IScreenshotReview>({
  _id: { type: String },
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
  platform: { type: String, enum: ["whatsapp", "instagram"], required: true },
  translations: { type: Schema.Types.Mixed, default: {} }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate string _id if missing
ScreenshotReviewSchema.pre("validate", function(next) {
  if (!this._id) {
    this._id = new Types.ObjectId().toHexString();
  }
  next();
});

ScreenshotReviewSchema.virtual("id").get(function(this: IScreenshotReview) {
  return this._id;
});

export const ScreenshotReview = model<IScreenshotReview>("ScreenshotReview", ScreenshotReviewSchema);
