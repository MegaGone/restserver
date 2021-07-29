const { Router  } = require('express');
const { check } = require('express-validator');

// Controller
const controller = require('../controllers/uploads');

// Helpers
const { collectionAllowed } = require('../helpers');

// Middlewares 
const { validateFiles, validateFields } = require('../middlewares')

const router = Router();

router.post('/', validateFiles ,controller.uploadFile);

router.put('/:collection/:id', 
[
    validateFiles,
    check('id', 'Invalid ID').isMongoId(),
    check('collection').custom( c => collectionAllowed( c, ['users', 'products'] ) ),
    validateFields
]
,controller.updateImageCloudinary)
// ,controller.updateImage)


router.get('/:collection/:id', 
[
    check('id', 'Invalid ID').isMongoId(),
    check('collection').custom( c => collectionAllowed( c, ['users', 'products'] ) ),
    validateFields
]
, controller.showImage )

module.exports = router;