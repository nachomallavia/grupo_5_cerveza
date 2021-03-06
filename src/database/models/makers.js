let modelo = function(sequelize, dataTypes){
    let alias = "Makers";
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
        tableName: "makers",
        timestamps: false,
        underscore: true
    }
    let Makers = sequelize.define( alias, cols, config );
    Makers.associate = function(models){
        Makers.hasMany(models.Products,{
            as: 'maker',
            foreignKey: 'id_maker'
        })
    }
    return Makers;
}
module.exports = modelo;