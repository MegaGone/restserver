const { response } = require("express");

const getUsers = async (req, res = response) => {

  const { nombre = 'No name', perro, apikey} = req.query;

  res.json({
    msg: "get API",
    nombre,
    perro,
    apikey
  });
};

const updateUsers = async (req, res = response) => {
  const { id } = req.params;

  res.json({
    id
  });
};

const deleteUser = async (req, res = response) => {
  res.json({
    msg: "delete API",
  });
};

const createUser = async (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    nombre,
    edad,
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
