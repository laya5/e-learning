const express = require("express");
const { validationResult } = require("express-validator");
const { signUp, signin, signout } = require("../../logics/admin/adminauth");
const { requireSignIn } = require("../../middlewares/requireSignIn");
const { validate } = require("../../models/usersauth");
const {
  validatingSignin,
  isRequestValidated,
  requestValidation,
} = require("../../validators/validation");

const router = express.Router();

router.post("/signin", validatingSignin, isRequestValidated, signin);
router.post("/signup", requestValidation, isRequestValidated, signUp);
router.post("/signout", requireSignIn, signout);
/*
router.post("/profile", requireSignIn, (req, res) => {
  res.status(200).json({
    user: "profile",
  });
});
*/

module.exports = router;
