const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const createUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Crypt Pass
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.json({
    user,
  });
};

const getUsers = async (req, res = response) => {

  const { limit = 5, from = 0 } = req.query;

  const [ total, users ] = await Promise.all([
    User.countDocuments({ enabled: true }),
    User.find({ enabled: true }).skip(parseInt(from)).limit(parseInt(limit))
  ])

  res.json({
    total,
    users
  });
};

const updateUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...data } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    data.password = bcrypt.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, data);

  res.json({
    userDB,
  });
};

const deleteUser = async (req, res = response) => {

  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { enabled: false })

  res.json({
    user
  });
};

const patchUsers = async (req, res = response) => {
  res.json({
    msg: "patch API",
  });
};

module.exports = {
  getUsers,
  updateUsers,
  deleteUser,
  createUser,
  patchUsers,
};