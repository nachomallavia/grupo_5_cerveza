// const express = require ('express');
const path = require ('path');
const controller = {
    cart : function(req,res){
        res.render('cart/Cart.ejs');
    }

}
module.exports = controller;
    
