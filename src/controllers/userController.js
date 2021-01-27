const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {check, validationResult, body} = require('express-validator') ;
const db = require('../database/models');

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
        db.Users.create({
            email: req.body.email,
            avatar: req.file.filename,
            birthdate: req.body.fecha,
            password: bcryptjs.hashSync(req.body.password, 12)
        })
        .then(function(){
            res.redirect('/')
        })
        }else { 
        return res.render('users/register.ejs', {errors: errors.errors})}
        // let errors = validationResult(req);
        // if (errors.isEmpty()){
        //     let nuevoUsuario = {
        //         id: ultimoIdUser + 1,
        //         email: req.body.email,
        //         avatar: req.file.filename,
        //         birthdate: req.body.fecha,
        //         password: bcryptjs.hashSync(req.body.password, 12)
        //     };
        //     usuarios.push(nuevoUsuario)
        //         fs.writeFileSync(path.join(__dirname, '../database/users.json'), JSON.stringify(usuarios, null, 4));
        //         res.redirect('/')
        // } else { 
        //     return res.render('users/register.ejs', {errors: errors.errors})}
        

    },    
    logged: function(req, res) {
        // db.Users.findAll({
        //     where: { email: req.body.email}
        // })
        // .then(function(resultado){
        //     if(bcryptjs.compareSync(req.body.password,resultado[0].password)){
        //         res.send('Todo ok')
        //     } else {
        //         res.send('contraseña incorrecta')
        //     }
        // })

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
    },
    logout: function(req,res){
        req.session.destroy();
        res.redirect('/')
    }

};
    module.exports = controller;