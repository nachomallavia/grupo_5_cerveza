const path = require ('path');
const fs = require ('fs');
const db = require ('../database/models/index.js');

let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
    productos = JSON.parse(productos);

let categorias = fs.readFileSync(path.join(__dirname,'../database/categories.json'),'utf-8');
    categorias = JSON.parse(categorias);

let fabricantes = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/makers.json'),'utf-8'));
let coloresSrm = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/srm-index.json'),'utf-8'));
let formatos = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/formats.json'),'utf-8'));


module.exports = {
    home: (req, res) => {
        return res.render('main/home',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
    },
    test: (req,res) =>{
        db.Makers.findByPk(req.params.id)
        .then(function(resultado){ 
            res.send(resultado.id);
        })
        // return res.send();

    }
}