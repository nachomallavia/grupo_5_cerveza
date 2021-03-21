
module.exports = function(sequelize, dataTypes){
    let alias = "Products";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: dataTypes.STRING,
            notNull: true
        },
        id_maker:{
            type: dataTypes.INTEGER,
            notNull: true,
            references: {
                model: 'Makers',
                key: 'id'
              }
        },
        id_category:{
            type: dataTypes.INTEGER,
            notNull: true,
            references: {
                model: 'Categories',
                key: 'id'
              }
        },
        rating: {
            type: dataTypes.INTEGER
        },
        abv: {
            type: dataTypes.FLOAT,
            notNull: true
        },
        ibu:{
            type: dataTypes.INTEGER,
            notNull: true
        },
        id_srm:{
            type: dataTypes.INTEGER,
            notNull: true,
            references: {
                model: 'srm_index',
                key: 'id'
            }
        },
        description: {
            type: dataTypes.TEXT,
            notNull: true
        },
        price: {
            type: dataTypes.FLOAT,
            notNull: true
        },
        id_format:{
            type: dataTypes.INTEGER,
            notNull: true,
            references:{
                model: 'Formats',
                key: 'id'
            }
        },
        capacity:{
            type: dataTypes.INTEGER,
            notNull: true
        },
        image:{
            type: dataTypes.STRING,
        },
        state:{
            type: dataTypes.INTEGER,
            notNull: true,
        }
    }
    let config = {
        tableName: "products",
        timestamps: true,
        underscore: false
    }
    let Products = sequelize.define( alias, cols, config );
    Products.associate = function (models){

        Products.belongsTo(models.Makers,{
            as: "maker",
            foreignKey: "id_maker"
        })
        Products.belongsTo(models.Categories,{
            as: "category",
            foreignKey: "id_category"
        })
        Products.belongsTo(models.Srm,{
            as: "srm_index",
            foreignKey: "id_srm"
        })
        Products.belongsTo(models.Formats,{
            as: "format",
            foreignKey: "id_format"
        })
        Products.belongsToMany(models.Combos,{
            as: "combos",
            foreignKey: "id",
            through: 'combos_products'
        })
    }
    return Products;
}
