const { Role, User, Category } = require("../models");

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

module.exports = {
  validRole,
  emailExist,
  verifyUserById,
  verifyCategoryById,
  verifyCategory
};
