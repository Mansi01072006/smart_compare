const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mansipatidar239_db_user:rDmSmIpAbUE0SkES@cluster0.b4jjtyk.mongodb.net/?appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

module.exports = mongoose;