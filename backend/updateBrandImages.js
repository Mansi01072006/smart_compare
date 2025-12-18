const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");

async function updateBrandImages() {
  try {
    await Product.updateOne(
      { productId: "35" },
      { image: "https://m.media-amazon.com/images/I/61zQzQzQzQL._SX679_.jpg" }
    );
    
    await Product.updateOne(
      { productId: "36" },
      { image: "https://m.media-amazon.com/images/I/71QzQzQzQL._SX679_.jpg" }
    );
    
    await Product.updateOne(
      { productId: "37" },
      { image: "https://m.media-amazon.com/images/I/81QzQzQzQL._SX679_.jpg" }
    );

    console.log("✅ Brand images updated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating images:", error);
    process.exit(1);
  }
}

updateBrandImages();