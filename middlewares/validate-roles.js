const { request, response } = require("express");

const validateRole = (req = request, res = response, next) => {

  if (!req.user) {
      res.status(500).send('We cant verify the role without validate the token first')
  }

  const { role, name } = req.user;

  if( role !== 'ADMIN_ROLE' ){
    res.status(401).send(`${ name } dont have permissions`)
  }

  next();
};

const haveRoles = (...roles) => {

  return ( req = request, res = response, next ) => {

    if (!req.user) {
      res.status(500).send('We cant verify the role without validate the token first')
    }

    if ( !roles.includes(req.user.role) ) {
      return res.status(401).send(`Service need permissions of this roles ${ roles }`)
    }

    next();
  }

}

module.exports = {
  validateRole,
  haveRoles
};
