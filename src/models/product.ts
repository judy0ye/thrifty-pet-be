import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, default: null },
    miscInfo: { type: [String], default: [] },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now }
      }
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default ProductModel