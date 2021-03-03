const path = require ('path');
const db = require ('../database/models/index.js');
let users = ''
db.Users.findAll({attributes: ['email','id']})
.then(function(listado){
    users = listado;
})
let usersFiltrados = users;
for (let i = 0; i < users.length; i++) {
    delete users[i].password
}


const controller = {
    usersList:function(req,res){
        

        return res.status(200).json({
            cantidad: users.length,
            users: users
        })  
    }

}
module.exports = controller;
    