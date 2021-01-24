let modelo = function(sequelize, dataTypes){
    let alias = "Srm";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        code:{
            type: dataTypes.STRING,
            notNull: true
        }
    }
    let config = {
        tableName: "srm_index",
        timestamps: false,
        underscore: true
    }
    let Srm = sequelize.define( alias, cols, config );
    Srm.associate = function(models){
        Srm.hasMany(models.Products,{
            as: 'srm_index',
            foreignKey: 'id_srm'
        })
    }
    return Srm;
}
module.exports = modelo;