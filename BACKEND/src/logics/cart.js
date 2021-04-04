const mongose = require("mongoose");
const Cart = require("../models/cart.js");
exports.addToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }, (err, Cartsi) => {
    if (err) {
      res.status(400).json({
        err,
      });
    }
    if (Cartsi) {
      const produc = req.body.cartItems.product;
      console.log("this is pruct" + produc);
      const item = Cartsi.cart;
      let items = Cartsi.cart.find((c) => c.product == produc);

      let condition, action;
      if (items) {
        condition = { user: req.user._id, "cart.product": produc };
        action = {
          $set: {
            "cart.$": {
              ...req.body.cartItems,
              quantity: items.quantity + req.body.cartItems.quantity,
              price: req.body.cartItems.price,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        action = {
          $push: {
            cart: req.body.cartItems,
          },
        };
      }
      Cart.findOneAndUpdate(
        condition,
        action,
        (err, c) => {
          if (err) {
            res.status(400).json({ message: "error occured", err });
          }
          if (c) {
            res.status(200).json({ c });
          }
        },
        { useFindAndModify: false }
      );
    } else {
      const cart = new Cart({
        user: req.user._id,
        cart: [req.body.cartItems],
      });
      cart.save((err, c) => {
        if (err) {
          res.status(400).json({
            mesage: err,
          });
        }
        if (c) {
          res.status(200).json({
            message: c,
          });
        }
      });
    }
  });
};
/* alternatives
	  let items = 0;
      item.forEach((item1) => {
        if (item1.product == produc) {
          items = item1;
        }
      });
      console.log(items); */
