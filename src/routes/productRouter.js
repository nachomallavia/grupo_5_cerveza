const express = require('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/', productController.all);

router.get('/detail', productController.detail);

router.get('/create', productController.create);

router.get('/edit', productController.edit);


module.exports = router;