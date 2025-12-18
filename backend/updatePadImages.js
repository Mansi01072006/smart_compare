const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");

async function updatePadImages() {
  try {
    await Product.updateOne(
      { productId: "35" },
      { image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" }
    );
    
    await Product.updateOne(
      { productId: "36" },
      { image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400" }
    );
    
    await Product.updateOne(
      { productId: "37" },
      { image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400" }
    );

    console.log("✅ Sanitary pad images updated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating images:", error);
    process.exit(1);
  }
}

updatePadImages();