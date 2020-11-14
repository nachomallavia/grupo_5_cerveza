const express = require('express');
const app = express();
const path = require("path");
const cartRouter = require ('./routes/cartRouter');

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '/views/index.html'))
});

app.get('/product', function(req,res){
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
});

app.use('/cart', cartRouter);

app.get('/register', function(req,res){
    res.sendFile(path.join(__dirname, '/views/registro.html'))
});

app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, '/views/login.html'))
});

app.listen(3000, function(){
    console.log('Birras llegando..');
})