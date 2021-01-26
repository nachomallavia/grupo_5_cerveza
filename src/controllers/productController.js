const path = require ('path');
const fs = require ('fs');
let db = require('../database/models');

// let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
//     productos = JSON.parse(productos);

// let categorias = fs.readFileSync(path.join(__dirname,'../database/categories.json'),'utf-8');
//     categorias = JSON.parse(categorias);

// let fabricantes = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/makers.json'),'utf-8'));
// let coloresSrm = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/srm-index.json'),'utf-8'));
// let formatos = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/formats.json'),'utf-8'));

let productos, fabricantes, coloresSrm, categorias, formatos;

db.Products.findAll().then(function(dBproductos){
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

// let ultimoIdProducto = 0;
// for (let i = 0; i < productos.length; i++){
//     if (ultimoIdProducto < productos[i].id){
//         ultimoIdProducto = productos[i].id;
//     }
// }

const controller = {

    list : function(req,res){
        res.render('products/productList',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
    },
    detail : function(req, res){
        db.Products.findByPk(req.params.id)
        .then(function(producto){
            res.render('products/productDetail',{'producto': producto,'coloresSrm': coloresSrm});
        })
    },
    Create : function(req,res){
        res.render('products/productCreate',{'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
    },
    Edit : function(req, res){
        db.Products.findByPk(req.params.id)
        .then(function(producto){
            res.render('products/productEdit',{'producto': producto,'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
        })
    },
    CreateForm : function(req,res){
        db.Products.create({
            name: req.body.pname,
            id_maker: 1,
            id_category: 1,
            abv: req.body.pabv,
            ibu: req.body.pibu,
            id_srm: 1,
            description: req.body.pdesc,
            price: req.body.pprice,
            id_format: 1,
            capacity: req.body.pcapacity,
            image:  req.files[0].filename,
            rating: 0
        })
        .then(function(productoNuevo){
            res.redirect('/products/' + productoNuevo.id);
        })
        
    },
    EditForm : function(req,res){
        db.Products.update({
            name: req.body.pname,
            id_maker: 1,
            id_category: 1,
            abv: req.body.pabv,
            ibu: req.body.pibu,
            id_srm: 1,
            description: req.body.pdesc,
            price: req.body.pprice,
            id_format: 1,
            capacity: req.body.pcapacity,
            image:  req.files[0].filename,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(function(){
            res.redirect('/products/list');
        })
    },
    adminList : function(req,res){
        res.render('products/productAdminList',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm})
    },
    Delete : function(req,res){
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(){
            res.redirect('/');
        })
        
    }

}
module.exports = controller;