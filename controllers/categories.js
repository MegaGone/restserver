const { request, response } = require("express");
const { Category } = require("../models");

// Public User
const getCategories = async (req = request, res = response) => {
  
    const { limit = 5, from = 5 } = req.query;
    const query = { enabled: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
    ])
    

    return res.status(200).json({
        total,
        categories
    })

};

// Public
const getCategoryById = async (req = request, res = response) => {

    const { id } = req.params;
  
    const category = await Category.findById(id)

    return res.status(200).json({ category });

};

// User - valid token
const createCategory = async (req = request, res = response) => {
  // Convert to uppercase to validate names not sames
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `ERROR: ${name} al ready exist.`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  await category.save();

  return res.status(201).json({ category });
};

// User - valid token
const updateCategory = async (req = request, res = response) => {
  res.send("UPDATE");
};

// Admin
const deleteCategory = async (req = request, res = response) => {
  res.send("DELETE");
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
