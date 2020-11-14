// const express = require ('express');
const path = require ('path');
const controller = {
    cart : function(req,res){
        res.sendFile(path.join(__dirname, '../views/Cart.html'))
    }

}
module.exports = controller;
    
