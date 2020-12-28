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
        res.render('products/productList',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm});
    },
    detail:function(req, res){
        let producto = productos.find((producto) => {
            return producto.id == req.params.id;
        })
        res.render('products/productDetail',{'producto': producto,'coloresSrm': coloresSrm});
    },
    Create: function(req,res){
        res.render('products/productCreate',{'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
    },
    Edit: function(req, res){
        let producto = productos.find((producto) => {
            return producto.id == req.params.id;
        })
        res.render('products/productEdit',{'producto': producto,'categorias': categorias,'fabricantes': fabricantes, 'coloresSrm': coloresSrm, 'formatos': formatos});
    },
    CreateForm: function(req,res){
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
        res.redirect('../../admin/products');
    },
    EditForm: function(req,res){
        let editID = req.params.id - 1;
        productos[editID].name = req.body.pname;
        productos[editID].maker = req.body.pmaker;
        productos[editID].category = req.body.pcategory;
        productos[editID].abv = req.body.pabv;
        productos[editID].ibu = req.body.pibu;
        productos[editID].srm = req.body.psrm;
        productos[editID].desc = req.body.pdesc;
        productos[editID].price = req.body.pprice;
        productos[editID].format = req.body.pformat;
        productos[editID].capacity = req.body.pcapacity;
        productos[editID].image = req.files[0].filename;
        fs.writeFileSync(path.join(__dirname, '../database/products.json'), JSON.stringify(productos, null, 4));
        res.redirect('../../../products/' + req.params.id);
    },
    adminList: function(req,res){
        res.render('products/productAdminList',{'categorias': categorias,'fabricantes': fabricantes,'productos': productos,'coloresSrm':coloresSrm})
    },
    Delete: function(req,res){
        let productsFiltered = productos.filter(producto => producto.id != req.params.id);
        fs.writeFileSync(path.join(__dirname, '../database/products.json'), JSON.stringify(productsFiltered, null, 4));
        res.redirect('../../');
    }
    
}
module.exports = controller;