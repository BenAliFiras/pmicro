const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // Handle incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // Handle incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // Handle duplicate email error
  if (err.code === 11000 && err.keyValue.email) {
    errors.email = "That email is already registered";
  }

  // Handle validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Create JSON web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

// Controller actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const user = await User.create({ email, password, first_name, last_name });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    
    // Include user details and token in the response
    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      token: token
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.get_all_users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};