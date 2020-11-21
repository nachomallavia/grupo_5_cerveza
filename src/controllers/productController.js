const path = require ('path');
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
    }

}
module.exports = controller;
    