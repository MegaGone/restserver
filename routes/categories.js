const { Router } = require('express');
const { check } = require('express-validator');

// Helpers 
const { verifyCategoryById } = require('../helpers/db-validators');

// Controller
const controller = require('../controllers/categories');

// Middlewares
const { validateFields, validateJWT } = require('../middlewares')

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

router.put('/:id', controller.updateCategory);

router.delete('/:id', controller.deleteCategory);

module.exports = router;