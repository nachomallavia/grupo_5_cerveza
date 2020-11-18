const express = require('express');
const app = express();
const path = require("path");
const cartRouter = require ('./routes/cartRouter');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', function(req,res){
    res.render(path.join(__dirname, '/views/index.ejs'))
});

app.get('/product', function(req,res){
    res.render(path.join(__dirname, '/views/productDetail.ejs'))
});

app.use('/cart', cartRouter);

app.get('/register', function(req,res){
    res.render(path.join(__dirname, '/views/registro.ejs'))
});

app.get('/login', function(req,res){
    res.render(path.join(__dirname, '/views/login.ejs'))
});

app.listen(3000, function(){
    console.log('Birras llegando..');
})