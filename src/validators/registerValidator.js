const {check, validationResult, body} = require('express-validator') ;
const fs = require('fs');
const path = require('path');
const db = require('../database/models');

let usuarios = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8');
usuarios = JSON.parse(usuarios);


module.exports = [check('email').isEmail().withMessage('Debe ingresar un mail válido'),
check('password').isLength({min: 8}).withMessage('Su contraseña debe tener un mínimo de 8 caracteres'),
body('email').custom(function(value){




// db.Users.findOne({
//   where: { email: 'jose@db.db'}
// }).then(function(resultado)
// {if(resultado==null){
// return 'true'
// } else {
// return 'true'
// }})



    for (let i = 0 ; i < usuarios.length ; i++){
      if (usuarios[i].email == value ){
        return false;
      }
    } 
    return true;
  }).withMessage('Usuario ya existente')
]