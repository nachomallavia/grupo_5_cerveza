module.exports = function(sequelize, dataTypes){
    let alias = "combos_products";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        id_combo:{
            type: dataTypes.INTEGER,
            notNull: true,
            references:{
                model: 'Combos',
                key: 'id'
            }
        },
        id_product:{
            type: dataTypes.INTEGER,
            notNull: true,
            references:{
                model: 'Products',
                key: 'id'
            }
        },
        amount: {
            type: dataTypes.INTEGER,
            notNull: true
        },
    }
    let config = {
        tableName: "combos_products",
        timestamps: false,
        underscore: false
    }
    let combos_products = sequelize.define( alias, cols, config );
    combos_products.associate = function (models){

        combos_products.belongsTo(models.Products,{
            as: "product",
            foreignKey: "id_product"
        })
        combos_products.belongsTo(models.Combos,{
            as: "combos",
            foreignKey: "id_combo"
        })
    }
    return combos_products;
}
