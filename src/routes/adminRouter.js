const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const productsController = require('../controllers/productController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, req.body.pname + "_picture"+ path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.get('/products', productsController.adminList);

router.get('/products/create', productsController.create);
router.post('/products/create', upload.any(), productsController.createForm);

router.get('/products/:id/edit', productsController.edit);
router.put('/products/:id/edit', upload.any(), productsController.editForm);


router.delete('/products/:id', productsController.delete);

module.exports = router;