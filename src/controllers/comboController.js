const path = require ('path');
const fs = require ('fs');

let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
    productos = JSON.parse(productos);

let combos = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/combos.json'),'utf-8'));

let categorias = fs.readFileSync(path.join(__dirname,'../database/categories.json'),'utf-8');
    categorias = JSON.parse(categorias);

let ultimoIdCombo = 0;
for (let i = 0; i < combos.length; i++){
    if (ultimoIdCombo < combos[i].id){
        ultimoIdCombo = combos[i].id;
    }
}

const controller = {
    list: function(req, res){
        res.render('products/comboList');
    },
    adminList: function(req, res){
        res.render('products/comboAdminList');
    },
    Create: function(req, res){
        res.render('products/comboCreate');
    },
    CreateForm: function(req, res){
        
    },
    edit: function(req, res){
        res.render('products/comboEdit');
    },
    EditForm: function(req, res){

    },
    Delete: function(req, res){

    },

};
module.exports = controller;