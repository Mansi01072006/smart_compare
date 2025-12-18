const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  productId: String,
  platform: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  rating: Number,
  reviews: Number,
  deliveryDays: Number,
  inStock: { type: Boolean, default: true },
  seller: String,
  warranty: String,
  returnPolicy: String,
  url: String,
  qualityScore: Number, // 1-10 based on reviews and ratings
  valueScore: Number, // price vs quality ratio
  platformLogo: String
}, { timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);
