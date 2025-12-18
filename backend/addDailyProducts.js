const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");
const Listing = require("./models/Listing");

async function addDailyProducts() {
  try {
    const dailyProducts = [
      {
        productId: "29",
        name: "L'Oreal Paris Total Repair 5 Shampoo",
        brand: "L'Oreal",
        category: "Hair Care",
        description: "Repairing shampoo for damaged hair with ceramide and protein",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        specifications: { color: "Clear", size: "650ml", weight: "700g", material: "Liquid" },
        averageRating: 4.2,
        totalReviews: 8500
      },
      {
        productId: "30",
        name: "TRESemme Keratin Smooth Conditioner",
        brand: "TRESemme",
        category: "Hair Care",
        description: "Smoothing conditioner with keratin for frizz control",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        specifications: { color: "White", size: "580ml", weight: "620g", material: "Cream" },
        averageRating: 4.3,
        totalReviews: 6200
      },
      {
        productId: "31",
        name: "Dove Daily Moisture Body Wash",
        brand: "Dove",
        category: "Body Care",
        description: "Moisturizing body wash with 1/4 moisturizing cream",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        specifications: { color: "White", size: "500ml", weight: "550g", material: "Liquid" },
        averageRating: 4.4,
        totalReviews: 12000
      },
      {
        productId: "32",
        name: "Colgate Total Advanced Health Toothpaste",
        brand: "Colgate",
        category: "Oral Care",
        description: "Complete protection toothpaste with fluoride",
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400",
        specifications: { color: "White", size: "150g", weight: "180g", material: "Paste" },
        averageRating: 4.1,
        totalReviews: 15000
      },
      {
        productId: "33",
        name: "Pantene Pro-V Hair Oil",
        brand: "Pantene",
        category: "Hair Care",
        description: "Nourishing hair oil with vitamins for stronger hair",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        specifications: { color: "Golden", size: "200ml", weight: "220g", material: "Oil" },
        averageRating: 4.0,
        totalReviews: 4800
      },
      {
        productId: "34",
        name: "Johnson's Baby Powder",
        brand: "Johnson's",
        category: "Baby Care",
        description: "Gentle baby powder with cornstarch for soft skin",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        specifications: { color: "White", size: "400g", weight: "450g", material: "Powder" },
        averageRating: 4.5,
        totalReviews: 9500
      }
    ];

    const dailyListings = [
      // L'Oreal Shampoo
      { productId: "29", platform: "Amazon", price: 399, originalPrice: 499, discount: 20, rating: 4.2, reviews: 3200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.4, platformLogo: "🛒" },
      { productId: "29", platform: "Flipkart", price: 419, originalPrice: 499, discount: 16, rating: 4.1, reviews: 2800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 8.2, platformLogo: "🛍️" },
      { productId: "29", platform: "Myntra", price: 409, originalPrice: 499, discount: 18, rating: 4.3, reviews: 2500, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "👗" },

      // TRESemme Conditioner
      { productId: "30", platform: "Amazon", price: 349, originalPrice: 449, discount: 22, rating: 4.3, reviews: 2400, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "🛒" },
      { productId: "30", platform: "Flipkart", price: 369, originalPrice: 449, discount: 18, rating: 4.2, reviews: 2000, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 8.4, platformLogo: "🛍️" },
      { productId: "30", platform: "Myntra", price: 359, originalPrice: 449, discount: 20, rating: 4.4, reviews: 1800, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "👗" },

      // Dove Body Wash
      { productId: "31", platform: "Amazon", price: 299, originalPrice: 399, discount: 25, rating: 4.4, reviews: 4500, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "🛒" },
      { productId: "31", platform: "Flipkart", price: 319, originalPrice: 399, discount: 20, rating: 4.3, reviews: 3800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 8.6, platformLogo: "🛍️" },
      { productId: "31", platform: "Myntra", price: 309, originalPrice: 399, discount: 23, rating: 4.5, reviews: 3700, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "👗" },

      // Colgate Toothpaste
      { productId: "32", platform: "Amazon", price: 89, originalPrice: 120, discount: 26, rating: 4.1, reviews: 5600, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.2, platformLogo: "🛒" },
      { productId: "32", platform: "Flipkart", price: 95, originalPrice: 120, discount: 21, rating: 4.0, reviews: 4800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 8.0, platformLogo: "🛍️" },
      { productId: "32", platform: "Myntra", price: 92, originalPrice: 120, discount: 23, rating: 4.2, reviews: 4600, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.4, platformLogo: "👗" },

      // Pantene Hair Oil
      { productId: "33", platform: "Amazon", price: 199, originalPrice: 249, discount: 20, rating: 4.0, reviews: 1800, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.0, platformLogo: "🛒" },
      { productId: "33", platform: "Flipkart", price: 209, originalPrice: 249, discount: 16, rating: 3.9, reviews: 1500, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 7.8, platformLogo: "🛍️" },
      { productId: "33", platform: "Myntra", price: 204, originalPrice: 249, discount: 18, rating: 4.1, reviews: 1500, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 8.2, platformLogo: "👗" },

      // Johnson's Baby Powder
      { productId: "34", platform: "Amazon", price: 249, originalPrice: 299, discount: 17, rating: 4.5, reviews: 3600, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "34", platform: "Flipkart", price: 259, originalPrice: 299, discount: 13, rating: 4.4, reviews: 3200, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "N/A", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "34", platform: "Myntra", price: 254, originalPrice: 299, discount: 15, rating: 4.6, reviews: 2700, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "N/A", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "👗" }
    ];

    await Product.insertMany(dailyProducts);
    await Listing.insertMany(dailyListings);

    console.log("✅ Daily use products added successfully!");
    console.log(`🧴 ${dailyProducts.length} daily products and ${dailyListings.length} listings added`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding daily products:", error);
    process.exit(1);
  }
}

addDailyProducts();