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
    return Makers;
}
module.exports = modelo;