const express = require('express');
const app = express();
const path = require('path');
const cartRouter = require ('./routes/cartRouter');
const productsRouter = require ('./routes/productRouter');
const usersRouter = require('./routes/usersRouter')

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req,res){
    res.render(path.join(__dirname, '/views/main/index.ejs'))
});

app.use('/products', productsRouter);
   
app.use('/cart', cartRouter);

app.use('/users', usersRouter);


app.listen(3000, function(){
    console.log('Birras llegando..');
})