const path = require ('path');
const fs = require ('fs');
const db = require ('../database/models/index.js');

// // let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
// //     productos = JSON.parse(productos);

// // let categorias = fs.readFileSync(path.join(__dirname,'../database/categories.json'),'utf-8');
// //     categorias = JSON.parse(categorias);

// // let fabricantes = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/makers.json'),'utf-8'));
// // let coloresSrm = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/srm-index.json'),'utf-8'));
// // let formatos = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/formats.json'),'utf-8'));

// let productos, fabricantes, coloresSrm, categorias, formatos;

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
//     formatos = dBformats
// })

module.exports = {
    home : async function(req,res){
        console.log("---------------------- esperando promesas -----------------------")
        const products = await db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]});
        const makers = await db.Makers.findAll();
        const srmIndex = await db.Srm.findAll();
        const categories = await db.Categories.findAll();
        const formats = await db.Formats.findAll();
        const combos = await db.Combos.findAll();
        console.log("---------------------- promesas listas -----------------------")

        res.render('main/home',{'combos':combos,'categorias': categories,'fabricantes': makers,'productos': products,'coloresSrm':srmIndex, 'formatos': formats})}
    ,test: (req,res) =>{
        db.Makers.findByPk(req.params.id)
        .then(function(resultado){ 
            res.send(resultado.name);
        })

    },
    contactos: function(req,res){
        res.render('main/contactos')
    },
    respuestaContacto: function(req,res){
        res.render('main/respuestaContacto')
    },
    search:
     function(req,res){
        db.Products.findAll({
            where: {
                name: {
                    [db.Sequelize.Op.like]: "%"+req.query.search+"%"
                }
            }
        })
        .then(function(resultado){
            productos= resultado;
            res.render('main/busqueda',{'productos': productos})
            // res.send(resultado)
        })
        .catch(function(e){
            res.send(e)
        })
    },
    search2:
    function(req,res){
        db.Products.findAll({include:[{association:"maker"},{association:"category"},{association:"srm_index"},{association:"format"}]},{
            where: {
                            name: {
                                [db.Sequelize.Op.like]: "%"+req.query.search+"%"
                            }
                        }            
        })
        .then(function(dBproductos){
            productos = dBproductos;
        })
        .then(function(){
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
                            res.render('main/busqueda',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
                        })
                    })
                })
            })
        })
    }
}