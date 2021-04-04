const mongose = require("mongoose");
const Categories = require("../models/categories.js");
const slugify = require("slugify");

function CreateCategories(categories, parentId = null) {
  const CategoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cat of category) {
    CategoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: CreateCategories(categories, cat._id),
    });
  }
  return CategoryList;
}

exports.addCategory = async (req, res) => {
  let categoryImage;
  if (req.file) {
    categoryImage = process.env.API + "public/" + req.file.filename;
  }
  const newObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    categoryImage: categoryImage,
  };
  if (req.body.parentId) {
    newObj.parentId = req.body.parentId;
  }
  const cat = new Categories(newObj);
  await cat.save((err, result) => {
    if (err) {
      return res.status(400).json({
        message: "coudnt create category",
        result: err,
      });
    } else if (result) {
      return res.status(200).json({
        message: "Category Created Succefully by admin",
        result: result,
      });
    }
  });
};

exports.findCategory = (req, res) => {
  Categories.find({}).exec((err, categories) => {
    if (err) {
      res.status(400).json({
        message: "couldnt find category",
        result: error,
      });
    }
    if (categories) {
      const List = CreateCategories(categories);
      res.status(200).json({ List });
    }
  });
};
/*

(error, result) => {
    console.log("This IS " + result);
    if (error) {
      
    } else if (result) {
      
    }

*/
