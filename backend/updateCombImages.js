const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");

async function updateCombImages() {
  try {
    await Product.updateOne(
      { productId: "26" },
      { image: "https://avimeeherbal.com/cdn/shop/products/COMB_3_d1-removebg-preview.png?v=1732164771&width=500" }
    );
    
    await Product.updateOne(
      { productId: "27" },
      { image: "https://brownliving.in/cdn/shop/products/bamboo-paddle-hair-brush-bamboo-bristles-detangling-comb-with-cotton-pouch-tbb-89-hair-comb-brown-living-456317.jpg?v=1682960457&width=1000" }
    );

    console.log("✅ Neem and Bamboo comb images updated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating images:", error);
    process.exit(1);
  }
}

updateCombImages();