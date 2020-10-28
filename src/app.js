const express = require('express');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '/views/index.html'))
});

app.get('/product', function(req,res){
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
});

app.get('/cart', function(req,res){
    res.sendFile(path.join(__dirname, '/views/productCart.html'))
});

app.get('/register', function(req,res){
    res.sendFile(path.join(__dirname, '/views/register.html'))
});

app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, '/views/login.html'))
});

app.listen(3000, function(){
    console.log('Birras..');
})