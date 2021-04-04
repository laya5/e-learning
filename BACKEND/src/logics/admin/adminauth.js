const bcrypt = require("bcrypt");
const User = require("../../models/admin/adminauth.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const { count } = require("../../models/admin/adminauth.js");

exports.signUp = function (req, res) {
  console.log("yes");
  User.findOne({ email: req.body.email }, async function (err, result) {
    if (err) {
      return res.status(400).json({
        message: "there is a problem with email please try again",
      });
    }
    console.log(result);
    if (result) {
      return res.status(404).json({
        message: "User already registered try login using existing email",
      });
    } else if (!result) {
      let pass = req.body.password;
      let hash_password = await bcrypt.hash(pass, 5);
      const { firstName, lastName, email } = req.body;
      const user1 = new User({
        firstName,
        lastName,
        email,
        hash_password,
        role: "Admin",
      });
      console.log(user1);
      user1.save(function (error, data) {
        console.log(data);
        if (data) {
          return res.status(201).json({
            user: data,
            message: "user registered succesfully",
          });
        }
        if (error) {
          console.log(error);
          return res.status(400).json({
            message: "something went wrong unable to signUp try again later",
          });
        }
      });
    }
  });
};
exports.signin = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, async function (err, result) {
    if (err) {
      return res.status(404).json({
        message: "please try again after sometime",
      });
    }
    if (result) {
      console.log("this result" + result);
      if (result.authenticate(req.body.password)) {
        console.log("this is here" + result.role);
        const token = jwt.sign(
          { _id: result._id, role: result.role },
          process.env.JWT_TOKEN,
          {
            expiresIn: "15d",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = result;
        res.cookie("token", token, { expireIn: "15d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "invalid password",
        });
      }
    } else if (!result) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }
  });
};
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "user loggedOut successfully",
  });
};
