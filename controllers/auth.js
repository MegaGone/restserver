const { request, response } = require("express");
const bcrypt = require('bcryptjs')

const User = require("../models/user");
const { generateJWT } = require('../helpers/jwt')

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
          ERROR: 'USER / PASSWORD are wrong - email'
      })
    }

    // User enabled status
    if( !user.enabled ){
        return res.status(400).json({
            ERROR: 'USER / PASSWORD are wrong - enabled: false '
        })
    }

    // Verify Password
    const validPassword = bcrypt.compareSync( password, user.password );

    if( !validPassword ) {
        return res.status(400).json({
            ERROR: 'USER / PASSWORD are wrong - password '
        })
    }

    // JWT
    const token = await generateJWT( user.id )

    res.json({
      user,
      token
    });


  } catch (e) {
    return res.status(500).json({
      e,
      msg: "Something has gone wrong, try again later",
    });
  }
};

module.exports = {
  login,
};
