const { Router } = require('express');

// Helpers
const { validRole, emailExist, verifyUserById } = require('../helpers/db-validators')

// Middlewares
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')

// Controllers
const controller = require('../controllers/user');

const router = Router();

router.get('/', controller.getUsers );

router.put('/:id', 
[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(verifyUserById),
    check('role').custom( validRole ),
    validateFields
],
controller.updateUsers );

router.post('/', 
[
    check('name',  'Name required').not().isEmpty(),
    check('email').custom( emailExist ),
    check('password', 'Password must at least 6 characters').isLength({min: 6}), 
    check('role').custom( validRole ),
    validateFields
], 
controller.createUser );

router.delete('/:id', 
[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( verifyUserById ),
    validateFields
]
,controller.deleteUser );

router.patch('/', controller.patchUsers )

module.exports = router;