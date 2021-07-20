const { Router } = require('express');
const { check } = require('express-validator');

// Helpers 
const { verifyCategoryById } = require('../helpers/db-validators');

// Controller
const controller = require('../controllers/categories');

// Middlewares
const { validateFields, validateJWT, haveRoles } = require('../middlewares')

const router = Router();

router.get('/', controller.getCategories);

router.post('/', 
[
    validateJWT,
    check('name', 'Name required').not().isEmpty(),
    validateFields
],
controller.createCategory);

router.get('/:id', 
[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(verifyCategoryById),
    validateFields
],
controller.getCategoryById);

router.put('/:id', 
[
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( verifyCategoryById ),
    check('name', 'You need provide a name to update the category.').not().isEmpty(),
    validateFields
]
,controller.updateCategory);

router.delete('/:id', 
[
    validateJWT,
    haveRoles('ADMIN_ROLE'),
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( verifyCategoryById ),
    validateFields
]
,controller.deleteCategory);

module.exports = router;