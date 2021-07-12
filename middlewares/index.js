const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateRole, haveRoles } = require('../middlewares/validate-roles');

module.exports = {
    validateFields,
    validateJWT,
    validateRole,
    haveRoles
}