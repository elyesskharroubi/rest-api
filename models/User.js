// requiring important stuff
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating user schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
});

// creating and exporting user model
const User = mongoose.model("user", userSchema);

module.exports = User;
