const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

const cartRouter = require ('./routes/cartRouter');
const productsRouter = require ('./routes/productRouter');
const usersRouter = require('./routes/usersRouter')
const adminRouter = require('./routes/adminRouter');
const indexRouter = require('./routes/indexRouter');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

app.listen(3000, function(){
    console.log('Birras llegando..');
})