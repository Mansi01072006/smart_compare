const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: String,
  name: String,
  brand: String,
  category: String,
  description: String,
  image: String,
  specifications: {
    color: String,
    size: String,
    weight: String,
    material: String
  },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
