const {check, validationResult, body} = require('express-validator') ;
const fs = require('fs');
const path = require('path');
const db = require('../database/models');

let usuarios = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8');
usuarios = JSON.parse(usuarios);


module.exports = [check('email').isEmail().withMessage('Debe ingresar un mail válido'),
check('password').isLength({min: 8}).withMessage('Su contraseña debe tener un mínimo de 8 caracteres'),
body('email')
.custom(async (email)=>{
  const existingUser = 
    await db.Users.findOne({
      where: {email}})
    if(existingUser){
      throw new Error ('Email ya existente')
    }
})

// .custom(function(value){
// db.Users.findOne({
//   where: { email: value}
// })
// .then(function(resultado){
//   if(resultado){
//     return false
//   }
// })
// .catch(function(e){
//   return true
// })
]