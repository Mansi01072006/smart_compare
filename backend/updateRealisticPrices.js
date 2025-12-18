const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");
const Listing = require("./models/Listing");

async function updateRealisticPrices() {
  try {
    // Delete existing shoe listings to update with realistic prices
    await Listing.deleteMany({ productId: { $in: ["21", "22", "23", "24", "25"] } });

    const realisticShoeListings = [
      // Nike Air Force 1 - Real market prices
      { productId: "21", platform: "Amazon", price: 7495, originalPrice: 8295, discount: 10, rating: 4.6, reviews: 3200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "🛒" },
      { productId: "21", platform: "Flipkart", price: 7799, originalPrice: 8295, discount: 6, rating: 4.5, reviews: 2800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 9.0, platformLogo: "🛍️" },
      { productId: "21", platform: "Myntra", price: 7647, originalPrice: 8295, discount: 8, rating: 4.7, reviews: 2200, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "👗" },
      { productId: "21", platform: "Nike Store", price: 8295, originalPrice: 8295, discount: 0, rating: 4.8, reviews: 1500, deliveryDays: 5, inStock: true, seller: "Nike", warranty: "1 year", returnPolicy: "60 days", url: "#", qualityScore: 9.6, platformLogo: "✔️" },

      // Adidas Stan Smith - Real market prices
      { productId: "22", platform: "Amazon", price: 5999, originalPrice: 7999, discount: 25, rating: 4.5, reviews: 4500, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "22", platform: "Flipkart", price: 6399, originalPrice: 7999, discount: 20, rating: 4.4, reviews: 3800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "22", platform: "Myntra", price: 6199, originalPrice: 7999, discount: 23, rating: 4.6, reviews: 2900, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "👗" },
      { productId: "22", platform: "Adidas Store", price: 7999, originalPrice: 7999, discount: 0, rating: 4.7, reviews: 1800, deliveryDays: 5, inStock: true, seller: "Adidas", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "⚡" },

      // Puma RS-X - Real market prices
      { productId: "23", platform: "Amazon", price: 8499, originalPrice: 12999, discount: 35, rating: 4.3, reviews: 1600, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "🛒" },
      { productId: "23", platform: "Flipkart", price: 8999, originalPrice: 12999, discount: 31, rating: 4.2, reviews: 1200, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.4, platformLogo: "🛍️" },
      { productId: "23", platform: "Myntra", price: 8749, originalPrice: 12999, discount: 33, rating: 4.4, reviews: 900, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "👗" },
      { productId: "23", platform: "Puma Store", price: 12999, originalPrice: 12999, discount: 0, rating: 4.5, reviews: 500, deliveryDays: 6, inStock: true, seller: "Puma", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🐾" },

      // Converse Chuck Taylor - Real market prices
      { productId: "24", platform: "Amazon", price: 3199, originalPrice: 4999, discount: 36, rating: 4.4, reviews: 5600, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "🛒" },
      { productId: "24", platform: "Flipkart", price: 3499, originalPrice: 4999, discount: 30, rating: 4.3, reviews: 4800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.6, platformLogo: "🛍️" },
      { productId: "24", platform: "Myntra", price: 3299, originalPrice: 4999, discount: 34, rating: 4.5, reviews: 3200, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "👗" },
      { productId: "24", platform: "Converse Store", price: 4999, originalPrice: 4999, discount: 0, rating: 4.6, reviews: 1200, deliveryDays: 7, inStock: true, seller: "Converse", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "⭐" },

      // Reebok Classic Leather - Real market prices
      { productId: "25", platform: "Amazon", price: 3999, originalPrice: 6999, discount: 43, rating: 4.2, reviews: 2400, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.4, platformLogo: "🛒" },
      { productId: "25", platform: "Flipkart", price: 4299, originalPrice: 6999, discount: 39, rating: 4.1, reviews: 2000, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.2, platformLogo: "🛍️" },
      { productId: "25", platform: "Myntra", price: 4149, originalPrice: 6999, discount: 41, rating: 4.3, reviews: 1600, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "👗" },
      { productId: "25", platform: "Reebok Store", price: 6999, originalPrice: 6999, discount: 0, rating: 4.4, reviews: 800, deliveryDays: 5, inStock: true, seller: "Reebok", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "🔺" }
    ];

    // Also update some existing product prices to be more realistic
    const realisticElectronicsListings = [
      // iPhone 15 Pro - Updated realistic prices
      { productId: "1", platform: "Amazon", price: 134900, originalPrice: 134900, discount: 0, rating: 4.6, reviews: 1800, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "🛒" },
      { productId: "1", platform: "Flipkart", price: 134900, originalPrice: 134900, discount: 0, rating: 4.5, reviews: 1200, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.0, platformLogo: "🛍️" },
      { productId: "1", platform: "Apple Store", price: 134900, originalPrice: 134900, discount: 0, rating: 4.8, reviews: 1500, deliveryDays: 1, inStock: true, seller: "Apple", warranty: "1 year", returnPolicy: "14 days", url: "#", qualityScore: 9.6, platformLogo: "🍎" },
      { productId: "1", platform: "Croma", price: 134900, originalPrice: 134900, discount: 0, rating: 4.4, reviews: 600, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 8.8, platformLogo: "🏪" }
    ];

    // Delete existing iPhone listings and add realistic ones
    await Listing.deleteMany({ productId: "1" });
    await Listing.insertMany(realisticElectronicsListings);
    await Listing.insertMany(realisticShoeListings);

    console.log("✅ Realistic prices updated successfully!");
    console.log(`💰 Updated ${realisticShoeListings.length} shoe listings and ${realisticElectronicsListings.length} electronics listings`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating prices:", error);
    process.exit(1);
  }
}

updateRealisticPrices();