const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const productsController = require('../controllers/productController');
const comboController = require('../controllers/comboController');
const productValidator = require('../validators/productValidator')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, req.body.pname + "_picture"+ path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })

// RUTAS DE PRODUCTO
router.get('/products', productsController.adminList);                                                 

router.get('/products/create', productsController.Create);                               
router.post('/products/create', upload.any(), productValidator, productsController.CreateForm);                   

router.get('/products/:id/edit', productsController.Edit);
router.put('/products/:id/edit', upload.any(), productValidator, productsController.EditForm);

router.delete('/products/:id', productsController.Delete);

// RUTAS DE COMBOS
router.get('/products/combos', comboController.adminList);                                                 

router.get('/products/combos/create', comboController.Create);                               
router.post('/products/combos/create', upload.any(), comboController.CreateForm);                   
            
router.get('/products/combos/:id/edit', comboController.edit);
router.put('/products/combos/:id/edit', upload.any(), comboController.EditForm);
            
router.delete('/products/combos/:id', comboController.Delete);

module.exports = router;