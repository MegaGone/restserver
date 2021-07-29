const uploadFile = require('./upload-file');
const googleVerify = require('./google-verify');
const validateJWT = require('./upload-file');
const dbValidators = require('./upload-file');

module.exports = {
    ...uploadFile,
    ...googleVerify,
    ...validateJWT,
    ...dbValidators,
}