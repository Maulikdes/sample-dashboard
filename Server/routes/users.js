var express = require('express');
var router = express.Router();
var userController = require('../controllers/user-controller');


/* GET users listing. */
router.get('/',  userController.getUsers);

router.get('/:id', userController.getUser);

router.put('/:id', userController.updateUser);

router.post('/', userController.createUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
