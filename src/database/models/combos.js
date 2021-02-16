module.exports = function(sequelize, dataTypes){
    let alias = "Combos";
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
        price: {
            type: dataTypes.FLOAT,
            notNull: true
        },
        image:{
            type: dataTypes.STRING,
        }
    }
    let config = {
        tableName: "combos",
        timestamps: false,
        underscore: false
    }
    let Combos = sequelize.define( alias, cols, config );
    Combos.associate = function (models){
        Combos.belongsToMany(models.Products,{
            as: "product",
            foreignKey: "id",
            through: "combos_products"
        })
    }
    return Combos;
}
