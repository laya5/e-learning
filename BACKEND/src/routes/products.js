const express = require("express");
const shortid = require("shortid");
const router = express.Router();

const multer = require("multer");
const path = require("path");
var store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

var upload = multer({ storage: store });
/*const { addCategory, findCategory } = require("../logics/categories.js");*/
const { requireSignIn, adminAuth } = require("../middlewares/requireSignIn.js");
const { CreateProduct, findProducts } = require("../logics/Products");
router.post(
  "/new",
  requireSignIn,
  adminAuth,
  upload.array("productFile"),
  CreateProduct
);

router.get("/find", findProducts); 

module.exports = router;
