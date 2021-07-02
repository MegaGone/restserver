const { Router } = require('express');
const controller = require('../controllers/user');

const router = Router();

router.get('/', controller.getUsers );

router.put('/:id', controller.updateUsers );

router.post('/', controller.createUser );

router.delete('/', controller.deleteUser );

router.patch('/', controller.patchUsers )

module.exports = router;