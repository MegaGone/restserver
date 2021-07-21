const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateJWT, validateFields } = require('../middlewares')

// Helpers
const { existCategory } = require('../helpers/db-validators');

// Contoller
const controller = require('../controllers/products');

const router = Router();

router.get('/', controller.getProducts);

router.post('/', 
[
    validateJWT,
    check('name', 'Invalid Name').not().isEmpty(),
    check('price', 'Enter a price').not().isNumeric(),
    check('category', 'Invalid category').not().isEmpty(),
    check('category').custom( existCategory ),
    validateFields
]
,controller.createProduct);

router.get('/:id', controller.getProductById);

router.put('/:id', controller.updateProduct);

router.delete('/:id', controller.deleteProduct);

module.exports = router;