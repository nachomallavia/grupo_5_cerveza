const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


router.get('/users', apiController.usersList);

router.get('/users/:id', apiController.usersDetail);

// router.get('/products', indexController.test);
router.get('/products', apiController.productsList);

router.get('/products/:id', apiController.productsDetail);

module.exports = router;