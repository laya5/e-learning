const express = require("express");
const { addToCart } = require("../logics/cart.js");

const router = express.Router();
const { requireSignIn, userAuth } = require("../middlewares/requireSignIn.js");
router.post("/add", requireSignIn, userAuth, addToCart);

module.exports = router;
