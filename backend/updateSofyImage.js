const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");

async function updateSofyImage() {
  try {
    await Product.updateOne(
      { productId: "37" },
      { image: "https://m.media-amazon.com/images/I/81HfqQ2qqvL._SX679_.jpg" }
    );

    console.log("✅ Sofy image updated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating image:", error);
    process.exit(1);
  }
}

updateSofyImage();