const path = require ('path');
const fs = require ('fs');

let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
let productosGuardados = JSON.parse(productos);

const controller = {
    all : function(req,res){
        res.render(path.join(__dirname, '../views/products/productList.ejs'))
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
    createForm: function(req,res){
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
    editForm: function(req,res){

    }

}
module.exports = controller;
    