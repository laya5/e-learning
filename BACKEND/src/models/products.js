const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      max: 300,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
    },
    productImage: [
      {
        img: {
          type: String,
        },
      },
    ],
    offer: {
      type: Number,
    },
    review: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        review: {
          type: String,
        },
      },
    ],
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      reuired: true,
    },
    UpdatedAt: Date,
  },
  { timestamps: true }
);

const Categories = mongoose.model("Products", ProductSchema);

module.exports = Categories;
