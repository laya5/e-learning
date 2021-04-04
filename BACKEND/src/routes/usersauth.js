const express = require("express");
const { signUp, signin, requireSignIn } = require("../logics/usersauth");
const { check } = require("express-validator");
const { requestValidation, isRequestValidated, validatingSignin } = require("../validators/validation");
const router = express.Router();

router.post(
  "/signin",
 validatingSignin,isRequestValidated,
  signin
);
router.post(
  "/signup",
 requestValidation,isRequestValidated,
  signUp);
/*
router.post("/profile", requireSignIn, (req, res) => {
  res.status(200).json({
    user: "profile",
  });
});
*/

module.exports = router;
