let modelo = function(sequelize, dataTypes){
    let alias = "Categories";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING,
            notNull: true
        }
    }
    let config = {
        tableName: "categories",
        timestamps: false,
        underscore: true
    }
    let Categories = sequelize.define( alias, cols, config );
    Categories.associate = function(models){
        Categories.hasMany(models.Products,{
            as: 'category',
            foreignKey: 'id_category'
        })
    }
    return Categories;
}
module.exports = modelo;