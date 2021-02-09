const {check, validationResult, body} = require('express-validator') ;

module.exports = [
    check('pname').notEmpty().isLength({max: 30}).withMessage('Debe Ingresar un nombre máximo de 30 caracteres'),
    check('pdesc').notEmpty().isLength({min: 40}).withMessage('Debe Ingresar una descripción mínimo de 40 caracteres'),
    check('pibu').notEmpty().isNumeric().withMessage('Debe Ingresar un valor válido para el IBU'),
    check('pabv').notEmpty().isNumeric().withMessage('Debe Ingresar un valor válido para el ABV'),
    check('pprice').notEmpty().withMessage('Debe Ingresar una precio válido'),
];


