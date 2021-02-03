const path = require ('path');
const fs = require ('fs');
let db = require('../database/models');

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

    list : function(req,res){
        res.render('products/productList',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
    },
    detail : function(req, res){
        db.Products.findByPk(req.params.id,{include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]})
        .then(function(producto){
            res.render('products/productDetail',{'producto': producto,'coloresSrm': coloresSrm});
        })
    },
    Create : function(req,res){
        res.render('products/productCreate',{'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
    },
    Edit : function(req, res){
        db.Products.findByPk(req.params.id,{include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]})
        .then(function(producto){
            res.render('products/productEdit',{'producto': producto,'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
        })
    },
    CreateForm : function(req,res){
        db.Products.create({
            name: req.body.pname,
            id_maker: req.body.pmaker,
            id_category: req.body.pcategory,
            abv: req.body.pabv,
            ibu: req.body.pibu,
            id_srm: req.body.psrm,
            description: req.body.pdesc,
            price: req.body.pprice,
            id_format: req.body.pformat,
            capacity: req.body.pcapacity,
            image:  req.files[0].filename,
            rating: 0
        })
        .then(function(productoNuevo){
            res.redirect('/products/' + productoNuevo.id);
        })
        
    },
    EditForm : function(req,res){
         // Si al editar, el usuario no cambia la foto, se mantiene la original.
        if(req.files[0] == null) {                               
            db.Products.update({
                name: req.body.pname,
                id_maker: req.body.pmaker,
                id_category: req.body.pcategory,
                abv: req.body.pabv,
                ibu: req.body.pibu,
                id_srm: req.body.psrm,
                description: req.body.pdesc,
                price: req.body.pprice,
                id_format: req.body.pformat,
                capacity: req.body.pcapacity,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                res.redirect('/admin/products');
            })

        } else {
            
            db.Products.update({
                name: req.body.pname,
                id_maker: req.body.pmaker,
                id_category: req.body.pcategory,
                abv: req.body.pabv,
                ibu: req.body.pibu,
                id_srm: req.body.psrm,
                description: req.body.pdesc,
                price: req.body.pprice,
                id_format: req.body.pformat,
                capacity: req.body.pcapacity,
                image:  req.files[0].filename,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                res.redirect('/admin/products');
            })
        }
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