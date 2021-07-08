const Role = require("../models/role");
const User = require("../models/user");

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

const verifyUserById = async ( id ) => {
  const userVerified = await User.findById(id);

  if (!userVerified) {
    throw new Error(`ERROR: ID (${id}) dont exist`)
  }
};

module.exports = {
  validRole,
  emailExist,
  verifyUserById,
};
