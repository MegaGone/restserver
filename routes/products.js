const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateJWT, validateFields, haveRoles } = require('../middlewares')

// Helpers
const { verifyCategoryById, verifyProductById, verifyProduct } = require('../helpers/db-validators');

// Contoller
const controller = require('../controllers/products');

const router = Router();

router.get('/', controller.getProducts);

router.post('/', 
[
    validateJWT,
    check('name', 'Invalid Name').not().isEmpty(),
    check('category', 'Invalid category').isMongoId(),
    check('category').custom( verifyCategoryById ),
    validateFields
]
,controller.createProduct);

router.get('/:id', 
[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( verifyProductById ),
    validateFields
]
,controller.getProductById);

router.put('/:id', 
[
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( verifyProductById ),
    check('name', 'You need provide a name to update the product').not().isEmpty(),
    check('name').custom( verifyProduct ),
    check('category').custom( verifyCategoryById ),
    validateFields
]
,controller.updateProduct);

router.delete('/:id', 
[
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( verifyProductById ),
    haveRoles('ADMIN_ROLE'),
    validateFields
]
,controller.deleteProduct);

module.exports = router;