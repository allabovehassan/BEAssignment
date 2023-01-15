const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    pass: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("UserAssignment", userSchema);
module.exports = { userModel };
// 63bff6b3082f4c3ed159c2e4
