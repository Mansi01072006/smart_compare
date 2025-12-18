const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");
const Listing = require("./models/Listing");

async function addCombs() {
  try {
    const combProducts = [
      {
        productId: "26",
        name: "Neem Wood Wide Tooth Comb",
        brand: "Kaya",
        category: "Personal Care",
        description: "Natural neem wood comb for detangling and healthy hair",
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400",
        specifications: { color: "Natural Brown", size: "7 inch", weight: "25g", material: "Neem Wood" },
        averageRating: 4.3,
        totalReviews: 2400
      },
      {
        productId: "27", 
        name: "Bamboo Hair Comb Fine Tooth",
        brand: "EcoVibe",
        category: "Personal Care",
        description: "Eco-friendly bamboo comb with fine teeth for smooth styling",
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400",
        specifications: { color: "Light Brown", size: "6 inch", weight: "20g", material: "Bamboo" },
        averageRating: 4.2,
        totalReviews: 1800
      },
      {
        productId: "28",
        name: "Sandalwood Pocket Comb",
        brand: "Mysore",
        category: "Personal Care", 
        description: "Premium sandalwood pocket comb with natural fragrance",
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400",
        specifications: { color: "Golden Brown", size: "4 inch", weight: "15g", material: "Sandalwood" },
        averageRating: 4.5,
        totalReviews: 3200
      }
    ];

    const combListings = [
      // Neem Wood Comb
      { productId: "26", platform: "Amazon", price: 299, originalPrice: 399, discount: 25, rating: 4.3, reviews: 900, deliveryDays: 3, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "🛒" },
      { productId: "26", platform: "Flipkart", price: 329, originalPrice: 399, discount: 18, rating: 4.2, reviews: 750, deliveryDays: 4, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.4, platformLogo: "🛍️" },
      { productId: "26", platform: "Myntra", price: 319, originalPrice: 399, discount: 20, rating: 4.4, reviews: 650, deliveryDays: 5, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "👗" },

      // Bamboo Comb
      { productId: "27", platform: "Amazon", price: 249, originalPrice: 349, discount: 29, rating: 4.2, reviews: 680, deliveryDays: 3, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.4, platformLogo: "🛒" },
      { productId: "27", platform: "Flipkart", price: 279, originalPrice: 349, discount: 20, rating: 4.1, reviews: 520, deliveryDays: 4, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.2, platformLogo: "🛍️" },
      { productId: "27", platform: "Myntra", price: 269, originalPrice: 349, discount: 23, rating: 4.3, reviews: 480, deliveryDays: 5, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "👗" },

      // Sandalwood Comb
      { productId: "28", platform: "Amazon", price: 599, originalPrice: 799, discount: 25, rating: 4.5, reviews: 1200, deliveryDays: 3, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "28", platform: "Flipkart", price: 649, originalPrice: 799, discount: 19, rating: 4.4, reviews: 980, deliveryDays: 4, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "28", platform: "Myntra", price: 629, originalPrice: 799, discount: 21, rating: 4.6, reviews: 850, deliveryDays: 5, inStock: true, seller: "Myntra", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "👗" }
    ];

    await Product.insertMany(combProducts);
    await Listing.insertMany(combListings);

    console.log("✅ Wooden combs added successfully!");
    console.log(`🪮 ${combProducts.length} comb products and ${combListings.length} listings added`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding combs:", error);
    process.exit(1);
  }
}

addCombs();