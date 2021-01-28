let modelo = function(sequelize, dataTypes){
    let alias = "UserType";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            notNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        rol:{
            type: dataTypes.STRING,
            notNull: true
        }
    }
    let config = {
        tableName: "user_type",
        timestamps: false,
        underscore: true
    }
    let UserType = sequelize.define( alias, cols, config );
    UserType.associate = function(models){
        UserType.hasMany(models.Users,{
            as: 'user_type',
            foreignKey: 'id_user_type'
        })
    }
    return UserType;
}
module.exports = modelo;