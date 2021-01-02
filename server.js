// requiring important stuff
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// configuring .env
require("dotenv").config({ path: "./config/.env" });
const url = process.env.MONGO_URI;

// requiring user model
const User = require("./models/User");

// establishing connection to mongo database
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => (err ? console.log(err) : console.log("Database is connected."))
);

// parse body
app.use(express.json());

// routing stuff
// all users
app.get("/all-users", (req, res) =>
  User.find()
    .then((el) => res.json(el))
    .catch((err) => console.log(err))
);

// add new user
app.post("/add-user", (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  let newUser = new User({ firstName, lastName, email, phone });
  newUser
    .save()
    .then(() => res.json({ msg: "User added succesfully." }))
    .catch((err) => console.log(err));
});

// edit existing user by id
app.put("/edit-user/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, (err) => {
    if (err) throw err;
    User.findById(req.params.id)
      .then((el) => res.json(el))
      .catch((err) => console.log(err));
  });
});

// delete existing user by id
app.delete("/delete-user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "User has been deleted." }))
    .catch((err) => console.log(err));
});

// setting up port
app.listen(5000, (err) =>
  err ? console.log(err) : console.log("App is listening on 5000.")
);
