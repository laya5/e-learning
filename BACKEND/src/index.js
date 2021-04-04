const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
const path = require("path");
const admins = require("./routes/admin/adminauth");
const users1 = require("./routes/usersauth");
const CateNew = require("./routes/categories");
const ProNew = require("./routes/products");
const Cart = require("./routes/cart");
require("dotenv").config();
const cors = require("cors");
//mongodb
//
//const strings= 'mongodb+srv://'+ process.env.MONGO_DB_USER + ':' + process.env.MONGODB_PASSWORD +'@ecommerce.yynip.mongodb.net/'+process.env.MONGODB_DATABASE+'?retryWrites=true&w=majority';
const url = "mongodb://127.0.0.1:27017/game-of-thrones";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongoose connected");
  });

// parse application/json
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/", users1);
app.use("/admin", admins);
app.use("/categories", CateNew);
app.use("/products", ProNew);
app.use("/users/cart", Cart);
app.listen(process.env.PORT, function () {
  console.log("yeah listening");
});
