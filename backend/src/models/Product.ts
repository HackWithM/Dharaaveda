import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document<string> {
  name: string;
  category: string;
  images: string[];
  description: string;
  pricing: string;
  specifications: {
    origin: string;
    packaging: string;
    purity: string;
    grade: string;
    minOrder: string;
    [key: string]: string;
  };
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  _id: { type: String },
  name: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, default: "" },
  pricing: { type: String, default: "Inquire for quote" },
  specifications: {
    origin: { type: String, required: true },
    packaging: { type: String, required: true },
    purity: { type: String, required: true },
    grade: { type: String, required: true },
    minOrder: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate string _id if missing
ProductSchema.pre("validate", function(next) {
  if (!this._id) {
    this._id = new Types.ObjectId().toHexString();
  }
  next();
});

ProductSchema.virtual("id").get(function(this: IProduct) {
  return this._id;
});

export const Product = model<IProduct>("Product", ProductSchema);
