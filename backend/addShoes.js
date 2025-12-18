const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");
const Listing = require("./models/Listing");

async function addShoes() {
  try {
    const shoeProducts = [
      {
        productId: "21",
        name: "Nike Air Force 1",
        brand: "Nike",
        category: "Shoes",
        description: "Classic basketball shoe with leather upper and Air-Sole unit",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
        specifications: { color: "White", size: "US 10", weight: "380g", material: "Leather" },
        averageRating: 4.6,
        totalReviews: 8500
      },
      {
        productId: "22",
        name: "Adidas Stan Smith",
        brand: "Adidas",
        category: "Shoes",
        description: "Iconic tennis shoe with clean white leather design",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
        specifications: { color: "White/Green", size: "US 10", weight: "350g", material: "Leather" },
        averageRating: 4.5,
        totalReviews: 12000
      },
      {
        productId: "23",
        name: "Puma RS-X",
        brand: "Puma",
        category: "Shoes",
        description: "Retro-futuristic running shoe with bold design and comfort",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        specifications: { color: "Multi", size: "US 10", weight: "400g", material: "Mesh/Synthetic" },
        averageRating: 4.3,
        totalReviews: 4200
      },
      {
        productId: "24",
        name: "Converse Chuck Taylor All Star",
        brand: "Converse",
        category: "Shoes",
        description: "Classic canvas high-top sneaker with rubber toe cap",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
        specifications: { color: "Black", size: "US 10", weight: "300g", material: "Canvas" },
        averageRating: 4.4,
        totalReviews: 15000
      },
      {
        productId: "25",
        name: "Reebok Classic Leather",
        brand: "Reebok",
        category: "Shoes",
        description: "Timeless leather sneaker with comfortable fit",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400",
        specifications: { color: "White", size: "US 10", weight: "340g", material: "Leather" },
        averageRating: 4.2,
        totalReviews: 6800
      }
    ];

    const shoeListings = [
      // Nike Air Force 1
      { productId: "21", platform: "Amazon", price: 7999, originalPrice: 8995, discount: 11, rating: 4.6, reviews: 3200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "🛒" },
      { productId: "21", platform: "Flipkart", price: 8299, originalPrice: 8995, discount: 8, rating: 4.5, reviews: 2800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 9.0, platformLogo: "🛍️" },
      { productId: "21", platform: "Myntra", price: 8199, originalPrice: 8995, discount: 9, rating: 4.7, reviews: 2200, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "👗" },
      { productId: "21", platform: "Nike Store", price: 8995, originalPrice: 8995, discount: 0, rating: 4.8, reviews: 1500, deliveryDays: 5, inStock: true, seller: "Nike", warranty: "1 year", returnPolicy: "60 days", url: "#", qualityScore: 9.6, platformLogo: "✔️" },

      // Adidas Stan Smith
      { productId: "22", platform: "Amazon", price: 6499, originalPrice: 7999, discount: 19, rating: 4.5, reviews: 4500, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "22", platform: "Flipkart", price: 6799, originalPrice: 7999, discount: 15, rating: 4.4, reviews: 3800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "22", platform: "Myntra", price: 6699, originalPrice: 7999, discount: 16, rating: 4.6, reviews: 2900, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "👗" },
      { productId: "22", platform: "Adidas Store", price: 7999, originalPrice: 7999, discount: 0, rating: 4.7, reviews: 1800, deliveryDays: 5, inStock: true, seller: "Adidas", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "⚡" },

      // Puma RS-X
      { productId: "23", platform: "Amazon", price: 8999, originalPrice: 10999, discount: 18, rating: 4.3, reviews: 1600, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "🛒" },
      { productId: "23", platform: "Flipkart", price: 9299, originalPrice: 10999, discount: 15, rating: 4.2, reviews: 1200, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.4, platformLogo: "🛍️" },
      { productId: "23", platform: "Myntra", price: 9199, originalPrice: 10999, discount: 16, rating: 4.4, reviews: 900, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "👗" },
      { productId: "23", platform: "Puma Store", price: 10999, originalPrice: 10999, discount: 0, rating: 4.5, reviews: 500, deliveryDays: 6, inStock: true, seller: "Puma", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🐾" },

      // Converse Chuck Taylor
      { productId: "24", platform: "Amazon", price: 3999, originalPrice: 4999, discount: 20, rating: 4.4, reviews: 5600, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "🛒" },
      { productId: "24", platform: "Flipkart", price: 4199, originalPrice: 4999, discount: 16, rating: 4.3, reviews: 4800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.6, platformLogo: "🛍️" },
      { productId: "24", platform: "Myntra", price: 4099, originalPrice: 4999, discount: 18, rating: 4.5, reviews: 3200, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "👗" },

      // Reebok Classic Leather
      { productId: "25", platform: "Amazon", price: 4999, originalPrice: 6999, discount: 29, rating: 4.2, reviews: 2400, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.4, platformLogo: "🛒" },
      { productId: "25", platform: "Flipkart", price: 5299, originalPrice: 6999, discount: 24, rating: 4.1, reviews: 2000, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.2, platformLogo: "🛍️" },
      { productId: "25", platform: "Myntra", price: 5199, originalPrice: 6999, discount: 26, rating: 4.3, reviews: 1600, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "👗" },
      { productId: "25", platform: "Reebok Store", price: 6999, originalPrice: 6999, discount: 0, rating: 4.4, reviews: 800, deliveryDays: 5, inStock: true, seller: "Reebok", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "🔺" }
    ];

    await Product.insertMany(shoeProducts);
    await Listing.insertMany(shoeListings);

    console.log("✅ Shoe products added successfully!");
    console.log(`👟 ${shoeProducts.length} shoe products and ${shoeListings.length} listings added`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding shoes:", error);
    process.exit(1);
  }
}

addShoes();