const path = require ('path');
const fs = require ('fs');

let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
let productosGuardados = JSON.parse(productos);
let categorias = fs.readFileSync(path.join(__dirname,'../database/categories.json'),'utf-8');
let categoriasParseadas = JSON.parse(categorias);
let fabricantes = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/makers.json'),'utf-8'));

const controller = {
    list : function(req,res){
        res.render(path.join(__dirname, '../views/products/productList.ejs'),{'categorias': categoriasParseadas,'fabricantes': fabricantes})
    },
    detail: function(req, res){
        res.render(path.join(__dirname, '../views/products/productDetail.ejs'))
    },
    create: function(req,res){
        res.render(path.join(__dirname, '../views/products/productCreate.ejs'))
    },
    edit: function(req, res){
        res.render(path.join(__dirname, '../views/products/productEdit.ejs'))
    },
    store: function(req,res){
        productosGuardados.push({
            name: req.body.pname,
            category: req.body.pcategory,
            abv: req.body.pabv,
            ibu: req.body.pibu,
            desc: req.body.pdesc,
            price: req.body.pprice,
            image: req.files[0].filename
        });
        fs.writeFileSync(path.join(__dirname, '../database/products.json'), JSON.stringify(productosGuardados, null, 4));
        res.redirect('..')
    },
    storeEdit: function(req,res){
        res.send("producto editado");
    }

}
module.exports = controller;
    