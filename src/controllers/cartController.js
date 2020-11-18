// const express = require ('express');
const path = require ('path');
const controller = {
    cart : function(req,res){
        res.render(path.join(__dirname, '../views/Cart.ejs'))
    }

}
module.exports = controller;
    
