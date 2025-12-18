const mongoose = require("mongoose");
require("./database");
const Listing = require("./models/Listing");

async function updateAllRealisticPrices() {
  try {
    // Delete all existing listings except shoes (already updated)
    await Listing.deleteMany({ productId: { $nin: ["21", "22", "23", "24", "25"] } });

    const realisticListings = [
      // iPhone 15 Pro - Real prices
      { productId: "1", platform: "Amazon", price: 134900, originalPrice: 134900, discount: 0, rating: 4.6, reviews: 1800, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "🛒" },
      { productId: "1", platform: "Flipkart", price: 134900, originalPrice: 134900, discount: 0, rating: 4.5, reviews: 1200, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.0, platformLogo: "🛍️" },
      { productId: "1", platform: "Apple Store", price: 134900, originalPrice: 134900, discount: 0, rating: 4.8, reviews: 1500, deliveryDays: 1, inStock: true, seller: "Apple", warranty: "1 year", returnPolicy: "14 days", url: "#", qualityScore: 9.6, platformLogo: "🍎" },

      // Samsung Galaxy S24 Ultra - Real prices
      { productId: "2", platform: "Amazon", price: 129999, originalPrice: 129999, discount: 0, rating: 4.5, reviews: 1400, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "2", platform: "Flipkart", price: 129999, originalPrice: 129999, discount: 0, rating: 4.4, reviews: 900, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "2", platform: "Samsung Store", price: 129999, originalPrice: 129999, discount: 0, rating: 4.7, reviews: 800, deliveryDays: 2, inStock: true, seller: "Samsung", warranty: "1 year", returnPolicy: "15 days", url: "#", qualityScore: 9.4, platformLogo: "📱" },

      // MacBook Pro 14 - Real prices
      { productId: "3", platform: "Amazon", price: 169900, originalPrice: 199900, discount: 15, rating: 4.8, reviews: 1100, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.6, platformLogo: "🛒" },
      { productId: "3", platform: "Flipkart", price: 174900, originalPrice: 199900, discount: 13, rating: 4.7, reviews: 700, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.4, platformLogo: "🛍️" },
      { productId: "3", platform: "Apple Store", price: 199900, originalPrice: 199900, discount: 0, rating: 4.9, reviews: 1000, deliveryDays: 1, inStock: true, seller: "Apple", warranty: "1 year", returnPolicy: "14 days", url: "#", qualityScore: 9.8, platformLogo: "🍎" },

      // Nike Air Max 270 - Real prices
      { productId: "4", platform: "Amazon", price: 7995, originalPrice: 12995, discount: 38, rating: 4.4, reviews: 2200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "🛒" },
      { productId: "4", platform: "Flipkart", price: 8495, originalPrice: 12995, discount: 35, rating: 4.3, reviews: 1800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.6, platformLogo: "🛍️" },
      { productId: "4", platform: "Myntra", price: 8195, originalPrice: 12995, discount: 37, rating: 4.5, reviews: 1600, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "👗" },
      { productId: "4", platform: "Nike Store", price: 12995, originalPrice: 12995, discount: 0, rating: 4.6, reviews: 1400, deliveryDays: 5, inStock: true, seller: "Nike", warranty: "1 year", returnPolicy: "60 days", url: "#", qualityScore: 9.2, platformLogo: "✔️" },

      // Sony WH-1000XM5 - Real prices
      { productId: "5", platform: "Amazon", price: 29990, originalPrice: 34990, discount: 14, rating: 4.7, reviews: 1900, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "🛒" },
      { productId: "5", platform: "Flipkart", price: 31990, originalPrice: 34990, discount: 9, rating: 4.6, reviews: 1300, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.2, platformLogo: "🛍️" },
      { productId: "5", platform: "Croma", price: 32990, originalPrice: 34990, discount: 6, rating: 4.8, reviews: 900, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 9.6, platformLogo: "🏪" },

      // Dell XPS 15 - Real prices
      { productId: "6", platform: "Amazon", price: 139990, originalPrice: 159990, discount: 13, rating: 4.5, reviews: 800, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "6", platform: "Flipkart", price: 144990, originalPrice: 159990, discount: 9, rating: 4.4, reviews: 600, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "6", platform: "Dell Store", price: 159990, originalPrice: 159990, discount: 0, rating: 4.7, reviews: 500, deliveryDays: 5, inStock: true, seller: "Dell", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "💻" },

      // Instant Pot Duo 7-in-1 - Real prices
      { productId: "7", platform: "Amazon", price: 8999, originalPrice: 12999, discount: 31, rating: 4.6, reviews: 3200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "🛒" },
      { productId: "7", platform: "Flipkart", price: 9499, originalPrice: 12999, discount: 27, rating: 4.5, reviews: 2800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.0, platformLogo: "🛍️" },
      { productId: "7", platform: "Croma", price: 9799, originalPrice: 12999, discount: 25, rating: 4.7, reviews: 1500, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 9.4, platformLogo: "🏪" },

      // Dyson V15 Detect - Real prices
      { productId: "8", platform: "Amazon", price: 59900, originalPrice: 65900, discount: 9, rating: 4.7, reviews: 1200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "2 years", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "🛒" },
      { productId: "8", platform: "Flipkart", price: 61900, originalPrice: 65900, discount: 6, rating: 4.6, reviews: 900, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "2 years", returnPolicy: "10 days", url: "#", qualityScore: 9.2, platformLogo: "🛍️" },
      { productId: "8", platform: "Croma", price: 63900, originalPrice: 65900, discount: 3, rating: 4.8, reviews: 600, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "2 years", returnPolicy: "7 days", url: "#", qualityScore: 9.6, platformLogo: "🏪" },

      // Philips Sonicare DiamondClean - Real prices
      { productId: "9", platform: "Amazon", price: 14999, originalPrice: 19999, discount: 25, rating: 4.5, reviews: 1800, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "2 years", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "9", platform: "Flipkart", price: 15999, originalPrice: 19999, discount: 20, rating: 4.4, reviews: 1400, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "2 years", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "9", platform: "Myntra", price: 15499, originalPrice: 19999, discount: 23, rating: 4.6, reviews: 1000, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "2 years", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "👗" },

      // Keurig K-Elite Coffee Maker - Real prices
      { productId: "10", platform: "Amazon", price: 12999, originalPrice: 16999, discount: 24, rating: 4.3, reviews: 2400, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "🛒" },
      { productId: "10", platform: "Flipkart", price: 13499, originalPrice: 16999, discount: 21, rating: 4.2, reviews: 1800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 8.4, platformLogo: "🛍️" },
      { productId: "10", platform: "Croma", price: 13999, originalPrice: 16999, discount: 18, rating: 4.4, reviews: 1200, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 8.8, platformLogo: "🏪" }
    ];

    await Listing.insertMany(realisticListings);

    console.log("✅ All realistic prices updated successfully!");
    console.log(`💰 Updated ${realisticListings.length} product listings with market prices`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating prices:", error);
    process.exit(1);
  }
}

updateAllRealisticPrices();