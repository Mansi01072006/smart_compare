const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");
const Listing = require("./models/Listing");

async function addSanitaryPads() {
  try {
    const padProducts = [
      {
        productId: "35",
        name: "Whisper Ultra Clean XL",
        brand: "Whisper",
        category: "Feminine Hygiene",
        description: "Ultra-thin sanitary pads with 5X protection and dry weave top sheet",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        specifications: { color: "White", size: "XL", weight: "15 pads", material: "Cotton" },
        averageRating: 4.3,
        totalReviews: 8500
      },
      {
        productId: "36",
        name: "Stayfree Secure Cottony Soft",
        brand: "Stayfree",
        category: "Feminine Hygiene",
        description: "Cottony soft sanitary pads with anti-bacterial protection",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        specifications: { color: "White", size: "Regular", weight: "20 pads", material: "Cotton" },
        averageRating: 4.2,
        totalReviews: 6800
      },
      {
        productId: "37",
        name: "Sofy Antibacteria XL",
        brand: "Sofy",
        category: "Feminine Hygiene",
        description: "Antibacterial sanitary pads with deep absorption core",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        specifications: { color: "White", size: "XL", weight: "10 pads", material: "Cotton" },
        averageRating: 4.4,
        totalReviews: 5200
      }
    ];

    const padListings = [
      // Whisper Ultra Clean XL
      { productId: "35", platform: "Amazon", price: 199, originalPrice: 249, discount: 20, rating: 4.3, reviews: 3200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "🛒" },
      { productId: "35", platform: "Flipkart", price: 209, originalPrice: 249, discount: 16, rating: 4.2, reviews: 2800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 8.4, platformLogo: "🛍️" },
      { productId: "35", platform: "Myntra", price: 204, originalPrice: 249, discount: 18, rating: 4.4, reviews: 2500, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "👗" },

      // Stayfree Secure
      { productId: "36", platform: "Amazon", price: 149, originalPrice: 189, discount: 21, rating: 4.2, reviews: 2600, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.4, platformLogo: "🛒" },
      { productId: "36", platform: "Flipkart", price: 159, originalPrice: 189, discount: 16, rating: 4.1, reviews: 2200, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 8.2, platformLogo: "🛍️" },
      { productId: "36", platform: "Myntra", price: 154, originalPrice: 189, discount: 19, rating: 4.3, reviews: 2000, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "👗" },

      // Sofy Antibacteria
      { productId: "37", platform: "Amazon", price: 129, originalPrice: 159, discount: 19, rating: 4.4, reviews: 2000, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "🛒" },
      { productId: "37", platform: "Flipkart", price: 139, originalPrice: 159, discount: 13, rating: 4.3, reviews: 1700, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 8.6, platformLogo: "🛍️" },
      { productId: "37", platform: "Myntra", price: 134, originalPrice: 159, discount: 16, rating: 4.5, reviews: 1500, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "👗" }
    ];

    await Product.insertMany(padProducts);
    await Listing.insertMany(padListings);

    console.log("✅ Sanitary pads added successfully!");
    console.log(`🩸 ${padProducts.length} pad products and ${padListings.length} listings added`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding sanitary pads:", error);
    process.exit(1);
  }
}

addSanitaryPads();