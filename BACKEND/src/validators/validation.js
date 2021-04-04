const { check, validationResult } = require("express-validator");

exports.requestValidation = [
  check("firstName").not().isEmpty().withMessage("firstName Required"),
  check("lastName").not().isEmpty().withMessage("lastName Required"),
  check("email")
    .isEmail()
    .withMessage("Email Required with correct adress this is a invalid email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password with minimum length of 6 is required Required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};

exports.validatingSignin = [
  check("email").isEmail().withMessage("Email Required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password with min 6 characters Required"),
];
