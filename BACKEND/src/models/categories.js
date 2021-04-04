const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
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
	categoryImage:{
		type:String,
	},
    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Categories = mongoose.model("category", CategorySchema);

module.exports = Categories;
