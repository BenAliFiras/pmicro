const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  last_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  date_of_birth: {
    type: Date,
  },
  address: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  banned: {
    type: Boolean,
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
