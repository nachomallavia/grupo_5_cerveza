let db = require('../database/models');

// let productos, fabricantes, coloresSrm, categorias, formatos, combos;

// db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]}).then(function(dBproductos){
//     productos = dBproductos;
// })
// db.Makers.findAll().then(function(dBfabricantes){
//     fabricantes = dBfabricantes;
// })
// db.Srm.findAll().then(function(dBcoloresSrm){
//     coloresSrm = dBcoloresSrm;
// })
// db.Categories.findAll().then(function(dBcategorias){
//     categorias = dBcategorias;
// })
// db.Formats.findAll().then(function(dBformats){
//     formatos = dBformats;
// })
// db.Combos.findAll({include:{all: true, nested: true}}).then(function(dBcombos){
//     combos = dBcombos;
// })

const controller = {

    comboList: async function(req,res){
        console.log("---------------------- esperando promesas -----------------------")
        const products = await db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]});
        const makers = await db.Makers.findAll();
        const srmIndex = await db.Srm.findAll();
        const categories = await db.Categories.findAll();
        const formats = await db.Formats.findAll();
        const combos = await db.Combos.findAll();
        console.log("---------------------- promesas listas -----------------------")

        res.render('combos/comboAdminList',{'combos':combos,'categorias': categories,'fabricantes': makers,'productos': products,'coloresSrm':srmIndex, 'formatos': formats})
    }, 

    list: async function(req, res){
        const productos = await db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]});
        const fabricantes = await db.Makers.findAll();
        const coloresSrm = await db.Srm.findAll();
        const categorias = await db.Categories.findAll();
        const combos = await db.Combos.findAll();
        res.render('combos/comboList',{'combos':combos,'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
    },
    adminList: function(req, res){
        res.render('combos/comboAdminList',{'combos':combos,'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
    },
    Create: async function(req, res){
        const productos = await db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]});
        res.render('combos/comboCreate',{'productos': productos});
    },
    CreateForm: function(req, res){
        let name = req.body.pname;
        let price = req.body.pprice;
        delete req.body.pname;
        delete req.body.pprice;
        let items = req.body;
        console.log(items);
        for(item in items){
            if(items[item] <= 0){
                delete items[item];
            }
        }
        db.Combos.create({
            name: name,
            price: price,
            image: req.files[0].filename,
        })
        .then(function(combo){
            for( item in items ){
                db.combos_products.create({
                    id_combo: combo.id,
                    id_product: item,
                    amount: items[item]
                })
                .then(function(relation){
                    console.log("succes");
                });
            }
            res.redirect('/admin/combos');
        })
    },
    edit: function(req, res){
        res.render('combos/comboEdit');
    },
    EditForm: function(req, res){
        
    },
    Delete: function(req, res){
        
    },

};
module.exports = controller;