const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {check, validationResult, body} = require('express-validator') ;


let usuarios = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8');
usuarios = JSON.parse(usuarios);

let ultimoIdUser = 0;
for (let i = 0; i < usuarios.length; i++){
    if (ultimoIdUser < usuarios[i].id){
        ultimoIdUser = usuarios[i].id;
    }
}

const controller = {
    register: function(req, res) {
        res.render('users/register.ejs')
    },
    login: function(req, res) {
        res.render('users/login.ejs')
    },
    save: function(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let nuevoUsuario = {
                id: ultimoIdUser + 1,
                email: req.body.email,
                avatar: req.file.filename,
                birthdate: req.body.fecha,
                password: bcryptjs.hashSync(req.body.password, 12)
            };
            usuarios.push(nuevoUsuario)
                fs.writeFileSync(path.join(__dirname, '../database/users.json'), JSON.stringify(usuarios, null, 4));
                res.redirect('/')
        } else { 
            return res.render('users/register.ejs', {errors: errors.errors})}
        

    },    
    logged: function(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let usuarioALoguearse;
            for (i = 0 ; i < usuarios.length ; i++){
                if( usuarios[i].email == req.body.email){
                    if(bcryptjs.compareSync(req.body.password, usuarios[i].password)){
                        usuarioALoguearse = usuarios[i];
                        break;    
                    }
                }
            }; 
            if (usuarioALoguearse == undefined){
                return res.render('users/login.ejs', {errors: [
                    {msg: 'Credenciales inválidas'}
                ]});
                
            } 
            req.session.usuarioLogueado = usuarioALoguearse;
            res.redirect('/')
        } else {
            return res.render('users/login.ejs', {errors: errors.errors});
        }
}
};
    module.exports = controller;