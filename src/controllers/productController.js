const path = require ('path');
const controller = {
    all : function(req,res){
        res.render(path.join(__dirname, '../views/productList.ejs'))
    },
    detail: function(req, res){
        res.render(path.join(__dirname, '../views/productDetail.ejs'))
    }

}
module.exports = controller;
    