const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateJWT, validateFields } = require('../middlewares')

// Contoller
const controller = require('../controllers/search');

const router = Router();

router.get('/:collection/:term', 
[
    validateJWT
]
,controller.search)

module.exports = router;