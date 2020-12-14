const path = require ('path');
const fs = require ('fs');

let productos = fs.readFileSync(path.join(__dirname, '../database/products.json'), 'utf-8');
    productos = JSON.parse(productos);

let categorias = fs.readFileSync(path.join(__dirname,'../database/categories.json'),'utf-8');
    categorias = JSON.parse(categorias);

let fabricantes = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/makers.json'),'utf-8'));
let coloresSrm = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/srm-index.json'),'utf-8'));
let formatos = JSON.parse(fs.readFileSync(path.join(__dirname,'../database/formats.json'),'utf-8'));


let ultimoIdProducto = 0;
for (let i = 0; i < productos.length; i++){
    if (ultimoIdProducto < productos[i].id){
        ultimoIdProducto = productos[i].id;
    }
}

const controller = {
    list : function(req,res){
        res.render(path.join(__dirname, '../views/products/productList.ejs'),{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm})
    },
    detail: function(req, res){
        res.render(path.join(__dirname, '../views/products/productDetail.ejs'))
    },
    create: function(req,res){
        res.render(path.join(__dirname, '../views/products/productCreate.ejs'),{'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos})
    },
    edit: function(req, res){
        res.render(path.join(__dirname, '../views/products/productEdit.ejs'))
    },
    createForm: function(req,res){
        
        productos.push({
            id: ultimoIdProducto + 1,
            name: req.body.pname,
            maker: req.body.pmaker,
            category: req.body.pcategory,
            rating: 0,
            abv: req.body.pabv,
            ibu: req.body.pibu,
            srm: req.body.psrm,
            desc: req.body.pdesc,
            price: req.body.pprice,
            format: req.body.pformat,
            capacity: req.body.pcapacity,
            image: req.files[0].filename
        });
        fs.writeFileSync(path.join(__dirname, '../database/products.json'), JSON.stringify(productos, null, 4));
        res.redirect('..')
    },
    editForm: function(req,res){

    }

}
module.exports = controller;
    