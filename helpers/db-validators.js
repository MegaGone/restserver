const { Role, User, Category, Product } = require("../models");

const validRole = async (role = "") => {
  const existRole = await Role.findOne({ role });

  if (!existRole) {
    throw new Error(`${role} its an invalid role.`);
  }
};

const emailExist = async (email = "") => {
  // Verify if the email exist
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    throw new Error(`ERROR: ${email} as already in use.`);
  }
};

const verifyUserById = async id => {
  const userVerified = await User.findById(id);

  if (!userVerified) {
    throw new Error(`ERROR: ID ${id} dont exist`);
  }
};

const verifyCategoryById = async id => {
  const categoryVerified = await Category.findById(id);

  if (!categoryVerified) {
    throw new Error(`ERROR: ID ${id} dont exist`);
  }
};

const verifyCategory = async (name = "") => {
  const nameDB = await Category.findOne({ name });

  if (nameDB) {
    throw new Error(`ERROR: ${name} as already in use.`);
  }
};

const existCategory = async (name = "") => {
  const productDB = await Product.findOne({ name });

  if (!productDB) {
    throw new Error(`ERROR: ${name} category dont exist.`);
  }
};

const verifyProductById = async id => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error(`ERROR: ID ${id} dont exist`)
  }
};

const verifyProduct = async ( name = "" ) => {

  const product = await Product.findOne({ name });

  if (product) {
    throw new Error(`ERROR: ${name} product already exist`)
  }

}

module.exports = {
  validRole,
  emailExist,
  verifyUserById,
  verifyCategoryById,
  verifyCategory,
  existCategory,
  verifyProductById,
  verifyProduct
};
