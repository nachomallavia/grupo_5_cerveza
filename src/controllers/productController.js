const path = require ('path');
const controller = {
    all : function(req,res){
        res.render(path.join(__dirname, '../views/products/productList.ejs'))
    },
    detail: function(req, res){
        res.render(path.join(__dirname, '../views/products/productDetail.ejs'))
    }

}
module.exports = controller;
    