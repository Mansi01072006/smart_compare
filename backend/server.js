const express = require("express");
const cors = require("cors");
require("./database");

const searchRoute = require("./routes/search");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/search", searchRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
