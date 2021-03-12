let db = require('../database/models');
const {check, validationResult, body} = require('express-validator') ;

let productos, fabricantes, coloresSrm, categorias, formatos;



const controller = {

    list : function(req,res){
        db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]}).then(function(dBproductos){
            productos = dBproductos;
        }).then(function(){
            db.Makers.findAll().then(function(dBfabricantes){
                fabricantes = dBfabricantes;
            }).then(function(){
                db.Srm.findAll().then(function(dBcoloresSrm){
                    coloresSrm = dBcoloresSrm;
                }).then(function(){
                    db.Categories.findAll().then(function(dBcategorias){
                        categorias = dBcategorias;
                    }).then(function(){
                        db.Formats.findAll().then(function(dBformats){
                            formatos = dBformats
                        }).then(function(){
                            res.render('products/productList',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
                        })
                    })
                })
            })
        })
    },
    detail : function(req, res){
        db.Products.findByPk(req.params.id,{include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]})
        .then(function(producto){
            res.render('products/productDetail',{'producto': producto,'coloresSrm': coloresSrm});
        })
    },
    Create : function(req,res){
        db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]}).then(function(dBproductos){
            productos = dBproductos;
        }).then(function(){
            db.Makers.findAll().then(function(dBfabricantes){
                fabricantes = dBfabricantes;
            }).then(function(){
                db.Srm.findAll().then(function(dBcoloresSrm){
                    coloresSrm = dBcoloresSrm;
                }).then(function(){
                    db.Categories.findAll().then(function(dBcategorias){
                        categorias = dBcategorias;
                    }).then(function(){
                        db.Formats.findAll().then(function(dBformats){
                            formatos = dBformats
                        }).then(function(){
                            res.render('products/productCreate',{'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
                        })
                    })
                })
            })
        })
        
    },
    Edit : function(req, res){
        db.Products.findByPk(req.params.id,{include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]})
        .then(function(producto){
            res.render('products/productEdit',{'producto': producto,'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
        })
    },
    CreateForm : function(req,res){
        let errors = validationResult(req);
        if (errors.isEmpty()){
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
        } else {
            db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]}).then(function(dBproductos){
                productos = dBproductos;
            }).then(function(){
                db.Makers.findAll().then(function(dBfabricantes){
                    fabricantes = dBfabricantes;
                }).then(function(){
                    db.Srm.findAll().then(function(dBcoloresSrm){
                        coloresSrm = dBcoloresSrm;
                    }).then(function(){
                        db.Categories.findAll().then(function(dBcategorias){
                            categorias = dBcategorias;
                        }).then(function(){
                            db.Formats.findAll().then(function(dBformats){
                                formatos = dBformats
                            }).then(function(){
                                return res.render('products/productCreate',{errors: errors.errors,'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos})
                            })
                        })
                    })
                })
            })
        }
            
    },
    EditForm : function(req,res){
        let errors = validationResult(req);
        if (errors.isEmpty()){
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
        } else {
            db.Products.findByPk(req.params.id,{include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]})
            .then(function(productodB){
                produducto = productodB;
                db.Makers.findAll().then(function(dBfabricantes){
                    fabricantes = dBfabricantes;
                }).then(function(){
                    db.Srm.findAll().then(function(dBcoloresSrm){
                        coloresSrm = dBcoloresSrm;
                    }).then(function(){
                        db.Categories.findAll().then(function(dBcategorias){
                            categorias = dBcategorias;
                        }).then(function(){
                            db.Formats.findAll().then(function(dBformats){
                                formatos = dBformats
                            }).then(function(){
                                return res.render('products/productEdit',{errors: errors.errors,'producto': producto,'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
                            })
                        })
                    })
                })
            })
        }
        
    },
    adminList : function(req,res){
        db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]}).then(function(dBproductos){
            productos = dBproductos;
        }).then(function(){
            db.Makers.findAll().then(function(dBfabricantes){
                fabricantes = dBfabricantes;
            }).then(function(){
                db.Srm.findAll().then(function(dBcoloresSrm){
                    coloresSrm = dBcoloresSrm;
                }).then(function(){
                    db.Categories.findAll().then(function(dBcategorias){
                        categorias = dBcategorias;
                    }).then(function(){
                        db.Formats.findAll().then(function(dBformats){
                            formatos = dBformats
                        }).then(function(){
                            res.render('products/productAdminList',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm})
                        })
                    })
                })
            })
        })
    },
    Delete : function(req,res){
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(){
            res.redirect('/admin/products');
        })
        
    }

}
module.exports = controller;