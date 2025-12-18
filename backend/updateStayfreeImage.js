const mongoose = require("mongoose");
require("./database");
const Product = require("./models/Product");

async function updateStayfreeImage() {
  try {
    await Product.updateOne(
      { productId: "36" },
      { image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS6R37fhmSQPS1DQNLSXF51Xffy5ZsSbMiZ1S6IJX1K3BRIOd5KnDCi1RfSSDyknFYZUzhAftAmXnMUDfIa-9uaw2DDT6L1BlhEhTTzspKYoG1QpRFbex6big" }
    );

    console.log("✅ Stayfree image updated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating image:", error);
    process.exit(1);
  }
}

updateStayfreeImage();