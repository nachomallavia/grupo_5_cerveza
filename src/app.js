const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const sesionIniciadaMiddleware = require('./middlewares/sesionIniciada');
const adminMiddleware = require('./middlewares/adminMiddleware');

const cartRouter = require ('./routes/cartRouter');
const productsRouter = require ('./routes/productRouter');
const usersRouter = require('./routes/usersRouter');
const adminRouter = require('./routes/adminRouter');
const indexRouter = require('./routes/indexRouter');

app.use(session( { secret: 'elio-pez' } ));
app.use(express.static(path.join(__dirname, '../public')));
app.use(sesionIniciadaMiddleware);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use('/admin', adminMiddleware, adminRouter);

app.listen(process.env.PORT || 3000 , function(){
    console.log('Birras llegando..');
})