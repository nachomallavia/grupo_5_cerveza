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

    list: async function(req, res){
        const productos = await db.Products.findAll({where:{state: 0},include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]});
        const fabricantes = await db.Makers.findAll();
        const coloresSrm = await db.Srm.findAll();
        const categorias = await db.Categories.findAll();
        const combos = await db.Combos.findAll({where:{state: 0}});
        res.render('combos/comboList',{'combos':combos,'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
    },
    detail: async function(req, res){
        const combo = await db.Combos.findByPk(req.params.id, {include: {model: db.Products, as: 'product'}}).catch(error =>{ console.log(error)});
        console.log(combo);
        res.send(`combo ${combo.product[0].dataValues}`);
        
    },
    adminList: async function(req, res){
        const productos = await db.Products.findAll({where:{state: 0},include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]});
        const fabricantes = await db.Makers.findAll();
        const coloresSrm = await db.Srm.findAll();
        const categorias = await db.Categories.findAll();
        const combos = await db.Combos.findAll({where:{state: 0}});
        res.render('combos/comboAdminList',{'combos':combos,'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
    },
    Create: async function(req, res){
        const productos = await db.Products.findAll({where:{state: 0},include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]});
        res.render('combos/comboCreate',{'productos': productos});
    },
    CreateForm: function(req, res){
        let name = req.body.pname;
        let price = req.body.pprice;
        let description = req.body.pdesc;
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
            description: description,
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
        db.Combos.findByPk(req.params.id)
        .then(function(combo){
            res.render('combos/comboEdit',{'combo': combo});
        })
    },
    EditForm: function(req, res){
             // Si al editar, el usuario no cambia la foto, se mantiene la original.
        if(req.files[0] == null) {                               
            db.Combos.update({
                name: req.body.pname,
                price: req.body.pprice,
                description: req.body.pdesc,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                res.redirect('/admin/combos');
            })

        } else {

            db.Combos.update({
                name: req.body.pname,
                price: req.body.pprice,
                description: req.body.pdesc,
                image: req.files[0].filename,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                res.redirect('/admin/combos');
            })
        }
    },
    Delete: function(req, res){
        let id = req.params.id
        db.Combos.update({
            state: 1
        },
        {
            where:{
                id: id
            }
        })
        .then(function(){
            res.redirect('/admin/combos');
        })
    },

};
module.exports = controller;