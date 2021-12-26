const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({
    ...req.body,
  }); //(...req.body) means mongoDB Will do all the Validation
  const token = user.createJWT(); //Invoke from User Model
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = (req, res) => {
  res.send("SIGN IN");
};

module.exports = {
  register,
  login,
};
