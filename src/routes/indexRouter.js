const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


router.get('/', indexController.home);
router.get('/contact', indexController.contactos);

router.get('/test/:id', indexController.test);

module.exports = router;