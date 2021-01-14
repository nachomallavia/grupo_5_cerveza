const path = require ('path');
const fs = require ('fs');

let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
    productos = JSON.parse(productos);

let combos = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/combos.json'),'utf-8'));

let categorias = fs.readFileSync(path.join(__dirname,'../database/categories.json'),'utf-8');
    categorias = JSON.parse(categorias);

let items = []; 

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
        res.render('products/comboCreate',{'productos': productos});
    },
    CreateForm: function(req, res){
        for(let i = 1; i <= productos.length; i++){
            //var item = req.body.pid + i;
            var item = `req.body.pid${i}`
            // if(item > 0){
            //     var itemDef = item;
            // }
            // if(item > 0){
            //     items.push({nombreProducto: item});
            // };
        }
        res.send(item);
        // combos.push({
        //     id: ultimoIdCombo + 1,
        //     name: req.body.pname,
        //     desc: req.body.pdesc,
        //     price: req.body.pprice,
        //     items:,
        //     image: req.files[0].filename
        // })
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