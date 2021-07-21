const { request, response } = require("express");
const { Category } = require("../models");

// Public User
const getCategories = async (req = request, res = response) => {
  
    const { limit = 5, from = 0 } = req.query;
    const query = { enabled: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ])
    

    return res.status(200).json({
        total,
        categories
    })

};

// Public
const getCategoryById = async (req = request, res = response) => {

    const { id } = req.params;
  
    const category = await Category.findById(id).populate('user', 'name')

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

  const { id } = req.params;
  
  const name = req.body.name.toUpperCase();
  
  try {
    
    const categoryDB = await Category.findByIdAndUpdate(id, { name }, { new: true });

    return res.status(200).json({ categoryDB });

  } catch (e) {
    // console.log(e);

    // Catch de error 'cause the category name already exist
    return res.status(400).json({msg: `ERROR: ${name} al ready exist`})
  }

};

// Admin
const deleteCategory = async (req = request, res = response) => {
  
  const { id } = req.params;

  const categoryDB = await Category.findByIdAndUpdate(id, { enabled: false });

  return res.status(200).json({ categoryDB })

};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
