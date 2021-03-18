const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const comboController = require('../controllers/comboController')

router.get('/', indexController.home);
router.get('/contact', indexController.contactos);
router.post('/contact', indexController.respuestaContacto);

router.get('/test/:id', indexController.test);
router.get('/combos', comboController.list);                                                 


module.exports = router;