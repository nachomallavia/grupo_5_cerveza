const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')


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
    },    
    logged: function(req, res) {
        res.send(req.body);
        // let emailUsuario = req.body.email;
        // let passUsuario = req.body.password;
        // for (let i =0; i<usuarios.length; i++){
        //     if(emailUsuario==usuarios[i].email){
        //         if(bcrypt.compareSync(passUsuario, user.password)){
        //             res.send("bienvenido")
        //         } else{res.send("los datos ingresados no son correctos")}

        //     } else {
        //         res.send(req.body)
        //     }
        // }

    },
};
    module.exports = controller;