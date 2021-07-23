const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require("../models");

const collectionsAllowed = ["categories", "products", "roles", "users"];

/**
    METHODS
**/
const searchUser = async (term = "", res = response) => {
  const itsMongoID = ObjectId.isValid(term);

  if (itsMongoID) {
    const user = await User.findById(term);
    return res.status(200).json({
      results: user ? [user] : [],
    });
  }

  // Regex = Regular Expression
  const regex = new RegExp(term, "i");

  const [total, users] = await Promise.all([
    User.count({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ enabled: true }],
    }),
    User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ enabled: true }],
    }),
  ]);

  return res.status(200).json({
    total,
    users,
  });
};

const searchCategory = async (term = "", res = response) => {
  const itsMongoID = ObjectId.isValid(term);

  if (itsMongoID) {
    const category = await Category.findById(term);
    return res.status(200).json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const [total, categories] = await Promise.all([
    Category.count({
      $or: [{ name: regex }],
      $and: [{ enabled: true }],
    }),
    Category.find({
      $or: [{ name: regex }],
      $and: [{ enabled: true }],
    }),
  ]);

  return res.status(200).json({
    total,
    categories,
  });
};

const searchProduct = async (term = "", res) => {
  const itsMongoID = ObjectId.isValid(term);

  if (itsMongoID) {
    const product = await Product.findById(term).populate("category", "name");
    return res.status(200).json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const [total, products] = await Promise.all([
    Product.countDocuments({
      $or: [{ name: regex }],
      $and: [{ enabled: true }],
    }),
    Product.find({
      $or: [{ name: regex }],
      $and: [{ enabled: true }],
    }).populate("category", "name"),
  ]);

  return res.status(200).json({
    total,
    products,
  });
  
};

/**
    ENDPOINT
**/
const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `ERROR: Collection ${collection} not allowed.`,
    });
  }

  switch (collection) {
    case "users":
      searchUser(term, res);
      break;

    case "categories":
      searchCategory(term, res);
      break;

    case "products":
      searchProduct(term, res);
      break;

    case "roles":
      break;

    default:
      res.status(500).send("ERROR: We have a issue to find.");
      break;
  }
};

module.exports = {
  search,
};
