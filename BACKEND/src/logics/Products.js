const express = require("express");
const Product = require("../models/products");
const shortid = require("shortid");
const slugify = require("slugify");
exports.CreateProduct = (req, res) => {
  const { name, description, price, quantity, Category } = req.body;
  let productImage = [];
  if (req.files.length > 0) {
    productImage = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  console.log(Category);
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    Category,
    productImage,
    CreatedBy: req.user._id,
  });
  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (product) {
      return res.status(200).json({
        message: "succesfully Created",
        product: product,
      });
    }
  });
  /*res.status(200).json({
    file: req.files,
    body: req.body,
  }); */
};

exports.findProducts = (req, res) => {
  Product.find({}).exec((err, categories) => {
    if (err) {
      res.status(400).json({
        message: "couldnt find Product",
        result: error,
      });
    }
    if (categories) {
      res.status(200).json({ categories });
    }
  });
};
