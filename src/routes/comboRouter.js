const express = require('express');
const router = express.Router();
const comboController = require ('../controllers/comboController');

router.get('/', comboController.list);

router.get('/:id', comboController.detail);

module.exports = router;