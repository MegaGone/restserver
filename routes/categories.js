const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateJWT, validateFields } = require('../middlewares');

// Controller
const controller = require('../controllers/categories');

const router = Router();

router.get('/', controller.getCategories);

router.post('/', 
[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
],
controller.createCategory);

router.get('/:id', controller.getCategoryById);

router.put('/:id', controller.updateCategory);

router.delete('/:id', controller.deleteCategory);

module.exports = router;