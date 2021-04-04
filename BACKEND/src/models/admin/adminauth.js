const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const AdminScheme = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "Admin"],
      default: "Admin",
    },
    contact: {
      type: Number,
      min: 10,
      max: 10,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);
// this is a mongo virtual function where it sets a virtual object named password to generate a salted hashed password and it wont be stores in mongdb database
// https://mongoosejs.com/docs/2.7.x/docs/virtuals.html
/* userScheme.virtual('password').set(function(password){
    this.hash_password= 
    bcrypt.hash(password, 10, function(err, hash) {
   if(err){
       console.log("error in generating password");
       console.log(err);
       
   }
   if(hash){
       return hash;
   }
});
}); 
methods here we are creating for comparing the salted password and password in database
*/
AdminScheme.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});
AdminScheme.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

const User = mongoose.model("Admin", AdminScheme);

module.exports = User;
