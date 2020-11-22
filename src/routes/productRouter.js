const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/uploads'))
    },
    filename: function(req, file, cb){
        cb(null, req.body.pname + "_picture"+ path.extname(file.originalname))
    }
})

var upload = multer({storage: storage})


const express = require('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/', productController.all);

router.get('/detail', productController.detail);

router.get('/create', productController.create);
router.post('/create', upload.any(), productController.createForm)

router.get('/edit', productController.edit);
router.post('/edit', upload.any(), productController.editForm)

module.exports = router;