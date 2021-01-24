let modelo = function(sequelize, dataTypes){
    let alias = "Formats";
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
        tableName: "formats",
        timestamps: false,
        underscore: true
    }
    let Formats = sequelize.define( alias, cols, config );
    Formats.associate = function(models){
        Formats.hasMany(models.Products,{
            as: 'format',
            foreignKey: 'id_format'
        })
    }
    return Formats;
}
module.exports = modelo;