const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");
const Listing = require("./models/Listing");

async function seedData() {
  try {
    await Product.deleteMany({});
    await Listing.deleteMany({});

    const products = [
      {
        productId: "1",
        name: "iPhone 15 Pro",
        brand: "Apple",
        category: "Smartphone",
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
        specifications: { color: "Natural Titanium", size: "6.1 inch", weight: "187g", material: "Titanium" },
        averageRating: 4.6,
        totalReviews: 4500
      },
      {
        productId: "2",
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        category: "Smartphone",
        description: "Premium Android phone with S Pen, 200MP camera, and AI features",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        specifications: { color: "Titanium Gray", size: "6.8 inch", weight: "232g", material: "Titanium" },
        averageRating: 4.5,
        totalReviews: 3200
      },
      {
        productId: "3",
        name: "MacBook Pro 14",
        brand: "Apple",
        category: "Laptop",
        description: "Powerful laptop with M3 Pro chip, stunning display, and all-day battery",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        specifications: { color: "Space Black", size: "14 inch", weight: "1.6kg", material: "Aluminum" },
        averageRating: 4.8,
        totalReviews: 2800
      },
      {
        productId: "4",
        name: "Nike Air Max 270",
        brand: "Nike",
        category: "Shoes",
        description: "Comfortable running shoes with Max Air cushioning",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        specifications: { color: "Black/White", size: "US 10", weight: "350g", material: "Mesh" },
        averageRating: 4.4,
        totalReviews: 5600
      },
      {
        productId: "5",
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "Headphones",
        description: "Industry-leading noise canceling headphones with premium sound",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400",
        specifications: { color: "Black", size: "Over-ear", weight: "250g", material: "Plastic" },
        averageRating: 4.7,
        totalReviews: 4100
      },
      {
        productId: "6",
        name: "Dell XPS 15",
        brand: "Dell",
        category: "Laptop",
        description: "Premium Windows laptop with InfinityEdge display",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
        specifications: { color: "Platinum Silver", size: "15.6 inch", weight: "1.8kg", material: "Aluminum" },
        averageRating: 4.5,
        totalReviews: 1900
      },
      {
        productId: "7",
        name: "Instant Pot Duo 7-in-1",
        brand: "Instant Pot",
        category: "Kitchen Appliances",
        description: "Multi-use pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        specifications: { color: "Stainless Steel", size: "6 Quart", weight: "5.8kg", material: "Stainless Steel" },
        averageRating: 4.6,
        totalReviews: 8500
      },
      {
        productId: "8",
        name: "Dyson V15 Detect",
        brand: "Dyson",
        category: "Home Appliances",
        description: "Cordless vacuum cleaner with laser dust detection and powerful suction",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        specifications: { color: "Yellow/Nickel", size: "Cordless", weight: "3.1kg", material: "Plastic/Metal" },
        averageRating: 4.7,
        totalReviews: 3200
      },
      {
        productId: "9",
        name: "Philips Sonicare DiamondClean",
        brand: "Philips",
        category: "Personal Care",
        description: "Electric toothbrush with 5 cleaning modes and smart sensor technology",
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400",
        specifications: { color: "White", size: "Rechargeable", weight: "144g", material: "Plastic" },
        averageRating: 4.5,
        totalReviews: 4800
      },
      {
        productId: "10",
        name: "Keurig K-Elite Coffee Maker",
        brand: "Keurig",
        category: "Kitchen Appliances",
        description: "Single serve K-Cup pod coffee maker with strong brew and iced coffee settings",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        specifications: { color: "Brushed Silver", size: "Single Serve", weight: "7.3kg", material: "Plastic/Metal" },
        averageRating: 4.3,
        totalReviews: 6200
      }
    ];

    const listings = [
      // iPhone 15 Pro
      { productId: "1", platform: "Amazon", price: 999, originalPrice: 1199, discount: 17, rating: 4.6, reviews: 1800, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "🛒" },
      { productId: "1", platform: "Flipkart", price: 1049, originalPrice: 1199, discount: 13, rating: 4.5, reviews: 1200, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.0, platformLogo: "🛍️" },
      { productId: "1", platform: "Apple Store", price: 1199, originalPrice: 1199, discount: 0, rating: 4.8, reviews: 1500, deliveryDays: 1, inStock: true, seller: "Apple", warranty: "1 year", returnPolicy: "14 days", url: "#", qualityScore: 9.6, platformLogo: "🍎" },
      { productId: "1", platform: "Croma", price: 1099, originalPrice: 1199, discount: 8, rating: 4.4, reviews: 600, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 8.8, platformLogo: "🏪" },
      
      // Samsung Galaxy S24 Ultra
      { productId: "2", platform: "Amazon", price: 1199, originalPrice: 1299, discount: 8, rating: 4.5, reviews: 1400, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "2", platform: "Flipkart", price: 1249, originalPrice: 1299, discount: 4, rating: 4.4, reviews: 900, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "2", platform: "Samsung Store", price: 1299, originalPrice: 1299, discount: 0, rating: 4.7, reviews: 800, deliveryDays: 2, inStock: true, seller: "Samsung", warranty: "1 year", returnPolicy: "15 days", url: "#", qualityScore: 9.4, platformLogo: "📱" },
      { productId: "2", platform: "Myntra", price: 1279, originalPrice: 1299, discount: 2, rating: 4.3, reviews: 500, deliveryDays: 5, inStock: true, seller: "Myntra", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 8.6, platformLogo: "👗" },
      
      // MacBook Pro 14
      { productId: "3", platform: "Amazon", price: 1899, originalPrice: 1999, discount: 5, rating: 4.8, reviews: 1100, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.6, platformLogo: "🛒" },
      { productId: "3", platform: "Flipkart", price: 1949, originalPrice: 1999, discount: 3, rating: 4.7, reviews: 700, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.4, platformLogo: "🛍️" },
      { productId: "3", platform: "Apple Store", price: 1999, originalPrice: 1999, discount: 0, rating: 4.9, reviews: 1000, deliveryDays: 1, inStock: true, seller: "Apple", warranty: "1 year", returnPolicy: "14 days", url: "#", qualityScore: 9.8, platformLogo: "🍎" },
      
      // Nike Air Max 270
      { productId: "4", platform: "Amazon", price: 129, originalPrice: 160, discount: 19, rating: 4.4, reviews: 2200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 8.8, platformLogo: "🛒" },
      { productId: "4", platform: "Flipkart", price: 139, originalPrice: 160, discount: 13, rating: 4.3, reviews: 1800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "6 months", returnPolicy: "10 days", url: "#", qualityScore: 8.6, platformLogo: "🛍️" },
      { productId: "4", platform: "Myntra", price: 135, originalPrice: 160, discount: 16, rating: 4.5, reviews: 1600, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "6 months", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "👗" },
      { productId: "4", platform: "Nike Store", price: 160, originalPrice: 160, discount: 0, rating: 4.6, reviews: 1400, deliveryDays: 5, inStock: true, seller: "Nike", warranty: "1 year", returnPolicy: "60 days", url: "#", qualityScore: 9.2, platformLogo: "✔️" },
      
      // Sony WH-1000XM5
      { productId: "5", platform: "Amazon", price: 349, originalPrice: 399, discount: 13, rating: 4.7, reviews: 1900, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "🛒" },
      { productId: "5", platform: "Flipkart", price: 369, originalPrice: 399, discount: 8, rating: 4.6, reviews: 1300, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.2, platformLogo: "🛍️" },
      { productId: "5", platform: "Croma", price: 379, originalPrice: 399, discount: 5, rating: 4.8, reviews: 900, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 9.6, platformLogo: "🏪" },
      
      // Dell XPS 15
      { productId: "6", platform: "Amazon", price: 1499, originalPrice: 1699, discount: 12, rating: 4.5, reviews: 800, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "6", platform: "Flipkart", price: 1549, originalPrice: 1699, discount: 9, rating: 4.4, reviews: 600, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "6", platform: "Dell Store", price: 1699, originalPrice: 1699, discount: 0, rating: 4.7, reviews: 500, deliveryDays: 5, inStock: true, seller: "Dell", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "💻" },
      
      // Instant Pot Duo 7-in-1
      { productId: "7", platform: "Amazon", price: 89, originalPrice: 119, discount: 25, rating: 4.6, reviews: 3200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "🛒" },
      { productId: "7", platform: "Flipkart", price: 95, originalPrice: 119, discount: 20, rating: 4.5, reviews: 2800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 9.0, platformLogo: "🛍️" },
      { productId: "7", platform: "Croma", price: 99, originalPrice: 119, discount: 17, rating: 4.7, reviews: 1500, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 9.4, platformLogo: "🏪" },
      
      // Dyson V15 Detect
      { productId: "8", platform: "Amazon", price: 649, originalPrice: 749, discount: 13, rating: 4.7, reviews: 1200, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "2 years", returnPolicy: "30 days", url: "#", qualityScore: 9.4, platformLogo: "🛒" },
      { productId: "8", platform: "Flipkart", price: 679, originalPrice: 749, discount: 9, rating: 4.6, reviews: 900, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "2 years", returnPolicy: "10 days", url: "#", qualityScore: 9.2, platformLogo: "🛍️" },
      { productId: "8", platform: "Croma", price: 699, originalPrice: 749, discount: 7, rating: 4.8, reviews: 600, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "2 years", returnPolicy: "7 days", url: "#", qualityScore: 9.6, platformLogo: "🏪" },
      
      // Philips Sonicare DiamondClean
      { productId: "9", platform: "Amazon", price: 199, originalPrice: 249, discount: 20, rating: 4.5, reviews: 1800, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "2 years", returnPolicy: "30 days", url: "#", qualityScore: 9.0, platformLogo: "🛒" },
      { productId: "9", platform: "Flipkart", price: 219, originalPrice: 249, discount: 12, rating: 4.4, reviews: 1400, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "2 years", returnPolicy: "10 days", url: "#", qualityScore: 8.8, platformLogo: "🛍️" },
      { productId: "9", platform: "Myntra", price: 229, originalPrice: 249, discount: 8, rating: 4.6, reviews: 1000, deliveryDays: 4, inStock: true, seller: "Myntra", warranty: "2 years", returnPolicy: "30 days", url: "#", qualityScore: 9.2, platformLogo: "👗" },
      
      // Keurig K-Elite Coffee Maker
      { productId: "10", platform: "Amazon", price: 149, originalPrice: 179, discount: 17, rating: 4.3, reviews: 2400, deliveryDays: 2, inStock: true, seller: "Amazon", warranty: "1 year", returnPolicy: "30 days", url: "#", qualityScore: 8.6, platformLogo: "🛒" },
      { productId: "10", platform: "Flipkart", price: 159, originalPrice: 179, discount: 11, rating: 4.2, reviews: 1800, deliveryDays: 3, inStock: true, seller: "Flipkart", warranty: "1 year", returnPolicy: "10 days", url: "#", qualityScore: 8.4, platformLogo: "🛍️" },
      { productId: "10", platform: "Croma", price: 169, originalPrice: 179, discount: 6, rating: 4.4, reviews: 1200, deliveryDays: 4, inStock: true, seller: "Croma", warranty: "1 year", returnPolicy: "7 days", url: "#", qualityScore: 8.8, platformLogo: "🏪" }
    ];

    await Product.insertMany(products);
    await Listing.insertMany(listings);

    console.log("✅ Sample data inserted successfully!");
    console.log(`📦 ${products.length} products and ${listings.length} listings added`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();