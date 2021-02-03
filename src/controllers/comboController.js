let db = require('../database/models');
const fs = require('fs');
const path = require('path');

let combos = fs.readFileSync(path.join(__dirname, '../database/combos.json'), 'utf8');
combos = JSON.parse(combos);

let productos, fabricantes, coloresSrm, categorias, formatos;

db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]}).then(function(dBproductos){
    productos = dBproductos;
})
db.Makers.findAll().then(function(dBfabricantes){
    fabricantes = dBfabricantes;
})
db.Srm.findAll().then(function(dBcoloresSrm){
    coloresSrm = dBcoloresSrm;
})
db.Categories.findAll().then(function(dBcategorias){
    categorias = dBcategorias;
})
db.Formats.findAll().then(function(dBformats){
    formatos = dBformats
})

const controller = {

    list: function(req, res){
        res.render('products/comboList');
    },
    adminList: function(req, res){
        res.render('products/comboAdminList');
    },
    Create: function(req, res){
        res.render('products/comboCreate',{'productos': productos});
    },
    CreateForm: function(req, res){
        let name = req.body.pname;
        let desc = req.body.pdesc;
        let price = req.body.pprice;
        delete req.body.pname;
        delete req.body.pdesc;
        delete req.body.pprice;
        let items = req.body;
        for(item in items){
            if(items[item] <= 0){
                delete items[item];
            }
        }
        combos.push({  
            name: name,
            desc: desc,
            price: price,
            items: items,
            image: req.files[0].filename
        });
        fs.writeFileSync(path.join(__dirname, '../database/combos.json'), JSON.stringify(combos, null, 4));
        res.redirect('/admin/products');
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