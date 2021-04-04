const bcrypt = require("bcrypt");
const User = require("../models/usersauth.js");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.signUp = function (req, res) {
  User.findOne({ email: req.body.email }, async function (err, result) {
    if (err) {
      return res.status(400).json({
        message: "there is a problem with email please try again",
      });
    }
    if (result) {
      return res.status(404).json({
        message: "User already registered try login using existing email",
      });
    } else {
      let pass = req.body.password;
      let hash_password = await bcrypt.hash(pass, 5);
      console.log(hash_password);
      const { firstName, lastName, email } = req.body;
      const user1 = new User({
        firstName,
        lastName,
        email,
        hash_password,
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
          return res.status(404).json({
            message: "something went wrong",
          });
        }
      });
    }
  });
};
exports.signin = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, async function (err, result) {
    try {
      if (result) {
        console.log(result);
        console.log();
        if (result.authenticate(req.body.password)) {
          const token = jwt.sign(
            { _id: result._id, role: result.role },
            process.env.JWT_TOKEN,
            {
              expiresIn: "15d",
            }
          );
          const { _id, firstName, lastName, email, role, fullName } = result;
          res.status(200).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName },
          });
        } else {
          return res.status(404).json({
            message: "invalid password",
          });
        }
      } else {
        return res.status(400).json({
          message: "error occured",
        });
      }
    } catch (err) {
      return res.status(404).json({
        message: "please try again after sometime",
      });
    }
  });
};
