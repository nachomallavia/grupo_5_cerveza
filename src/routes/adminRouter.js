const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const productsController = require('../controllers/productController');
const testController =require('../controllers/testController');
const comboController = require('../controllers/comboController');
const productValidator = require('../validators/productValidator');
const adminMiddleware = require('../middlewares/adminMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, req.body.pname + "_picture"+ path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })

// RUTA DE PRUEBA DE PROMESAS

router.get('/test', testController.productTest);

// RUTAS DE PRODUCTO
router.get('/', productsController.adminList);                                                 
router.get('/products', productsController.adminList);                                                 

router.get('/products/create', productsController.Create);                               
router.post('/products/create', upload.any(), productValidator, productsController.CreateForm);                   

router.get('/products/:id/edit', productsController.Edit);
router.put('/products/:id/edit', upload.any(), productValidator, productsController.EditForm);

router.delete('/products/:id', productsController.Delete);

// RUTAS DE COMBOS

router.get('/combos/create', comboController.Create);                               
router.post('/combos/create', upload.any(), comboController.CreateForm);                   
            
router.get('/combos/:id/edit', comboController.edit);
router.put('/combos/:id/edit', upload.any(), comboController.EditForm);
            
router.delete('/combos/:id', comboController.Delete);

module.exports = router;