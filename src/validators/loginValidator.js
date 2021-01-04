const {check, validationResult, body} = require('express-validator') ;
const fs = require('fs');
const path = require('path');

let usuarios = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8');
usuarios = JSON.parse(usuarios);


module.exports = [check('email').isEmail().withMessage('Debe ingresar un mail válido')
// ,
// body('email').custom(function(value){
//     for (let i = 0 ; i < usuarios.length ; i++){
//       if (usuarios[i].email == value ){
//         return false;
//       }
//     } 
//     return true;
//   }).withMessage('Usuario ya existente')
]