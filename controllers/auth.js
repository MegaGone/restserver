const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ERROR: "USER / PASSWORD are wrong - email",
      });
    }

    // User enabled status
    if (!user.enabled) {
      return res.status(400).json({
        ERROR: "USER / PASSWORD are wrong - enabled: false ",
      });
    }

    // Verify Password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ERROR: "USER / PASSWORD are wrong - password ",
      });
    }

    // JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Something has gone wrong, try again later",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {

  const { id_token } = req.body;

  try {

    const { email, name, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if( !user ){
      
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true
      }

      user = new User( data )
      await user.save();

    }

    // If the user enabled its false
    if( !user.enabled ){
        return res.status(401).json({
          msg: 'User blocked, contact an admin.'
        })
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Google token invalid",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
