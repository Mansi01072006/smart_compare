const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");

async function updateWhisperImage() {
  try {
    await Product.updateOne(
      { productId: "35" },
      { image: "https://www.quickpantry.in/cdn/shop/products/whisper-choice-ultra-sanitary-pads-extra-long-xl-6-pads-quick-pantry.jpg?v=1710538389" }
    );

    console.log("✅ Whisper image updated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating image:", error);
    process.exit(1);
  }
}

updateWhisperImage();