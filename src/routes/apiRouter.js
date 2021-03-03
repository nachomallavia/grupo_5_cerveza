const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


router.get('/users', apiController.usersList);

// router.get('/products', indexController.test);

module.exports = router;