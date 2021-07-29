const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateRole, haveRoles } = require('../middlewares/validate-roles');
const { validateFiles } = require('../middlewares/validate-files');

module.exports = {
    validateFields,
    validateJWT,
    validateRole,
    haveRoles,
    validateFiles
}