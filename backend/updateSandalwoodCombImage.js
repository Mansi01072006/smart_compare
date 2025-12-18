const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");

async function updateSandalwoodCombImage() {
  try {
    await Product.updateOne(
      { productId: "28" },
      { image: "https://nathabit.in/_nat/images/All_3_5691f7b19f.jpg?format=auto&width=1080&quality=75&f=n" }
    );

    console.log("✅ Sandalwood comb image updated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating image:", error);
    process.exit(1);
  }
}

updateSandalwoodCombImage();