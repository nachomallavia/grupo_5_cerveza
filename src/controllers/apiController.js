const db = require ('../database/models/index.js');

const controller = {
    
    usersList:function(req,res){
        db.Users.findAll({attributes: ['email','id','name']})
        .then(function(users){
            for(let i = 0; i < users.length; i++){
                users[i].dataValues["detail"] = `/api/users/${users[i].id}` 
            }
            return res.status(200).json({
                cantidad: users.length,
                users
            })  
        })
    },

    usersDetail:function(req,res){
        db.Users.findByPk(req.params.id,{attributes: ['email','id','name','avatar']})
        .then(function(user){
            user.avatar = `/uploads/avatars/${user.avatar}`; 
            return res.status(200).json({
                user
            })
        })
    },

    productsList: function(req,res){
        db.Products.findAll({include:[{association:"category"}],attributes: ['id','name','description','image']})
        .then(function(productos){
            for(let i = 0; i < productos.length; i++){
                productos[i].dataValues["detail"] = `/api/products/${productos[i].id}`

            }
            db.sequelize.query("SELECT t2.name, count(t1.id) as cant FROM products t1, categories t2 where t1.id_category=t2.id group by id_category")
            .then(function(categorias) {
                let categories = {}
                for(let i = 0; i < categorias[0].length; i++){
                    categories[categorias[0][i].name] = categorias[0][i].cant;
                }
                return res.status(200).json({
                    cantidad: productos.length,
                    cantidadPorCategoría: categories,
                    productos,

                })
            })
        })
    },
    productsDetail: function(req,res){
        db.Products.findByPk(req.params.id,{include:[{association:"category"},{association:"srm_index"},{association:"maker"},{association:"format"}],attributes: ['id','name','description','image','abv','ibu','price']})
        .then(function(product){
            let relations = [];
            product.category.dataValues["relationName"] = "Category"
            product.srm_index.dataValues["relationName"] = "Srm_index"
            product.maker.dataValues["relationName"] = "Maker"
            product.format.dataValues["relationName"] = "Format"
            relations.push(product.category)
            relations.push(product.format)
            relations.push(product.maker)
            relations.push(product.srm_index)
            
            product.image = `/uploads/${product.image}`; 
            return res.status(200).json({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                abv: product.abv,
                ibu: product.ibu,
                relations
            })
        })
    }

}
module.exports = controller;
    