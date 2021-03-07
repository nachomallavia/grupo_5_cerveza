const path = require ('path');
const db = require ('../database/models/index.js');
let users = ''
const controller = {
    
    usersList:function(req,res){
        db.Users.findAll({attributes: ['email','id','name','avatar']})
        .then(function(listado){
            users = listado;
            users.map(function(user){
                user.avatar = "/api/users/"+user.id;
            })
            console.log(users);
            return res.status(200).json({
                cantidad: users.length,
                users
            })  
        })
        // users.forEach(function (user) {
        //     user.avatar= "/api/users/"+user.id;
        // });
    },
    usersDetail:function(req,res){
        db.Users.findByPk(req.params.id,{attributes: ['email','id','name','avatar']})
        .then(function(user){
            user.avatar = "/uploads/avatars/"+user.avatar; 
            return res.status(200).json({
                user
            })
        })
    },
    productsList: function(req,res){
        db.Products.findAll({include:[{association:"category"}],attributes: ['id','name','description','image']})
        .then(function(dBproductos){
            productos = dBproductos;
            db.sequelize.query("SELECT t2.name, count(t1.id) as cant FROM products t1, categories t2 where t1.id_category=t2.id group by id_category")
            .then(function(categorias) {
                productos.map(function(producto){
                    producto.image = "/api/products/"+producto.id;
                })
                return res.status(200).json({
                    cantidad: productos.length,
                    cantidadPorCategoría: categorias[0],
                    productos,
                })
            })
        })
    },
    productsDetail: function(req,res){
        db.Products.findByPk(req.params.id,{include:[{association:"category"},{association:"srm_index"},{association:"maker"},{association:"format"}],attributes: ['id','name','description','image','abv','ibu','price']})
        .then(function(product){
            let relaciones = [];
            relaciones.push(product.category)
            relaciones.push(product.format)
            relaciones.push(product.maker)
            relaciones.push(product.srm_index)
            product.image = "/uploads/"+product.image; 
            return res.status(200).json({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                abv: product.abv,
                ibu: product.ibu,
                relaciones
            })
        })
    }

}
module.exports = controller;
    