let modelo = function(sequelize, dataTypes){
    let alias = "Users";
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
        },
        email: {
            type: dataTypes.STRING,
            notNull: true
        },
        avatar:{
            type: dataTypes.STRING,
            notNull: true
        },
        password:{
            type: dataTypes.STRING,
            notNull: true
        },
        birthdate: {
            type: dataTypes.DATE,
            notNull: true
        },
        id_user_type:{
            type: dataTypes.INTEGER,
            notNull: true
        }
    }
    let config = {
        tableName: "users",
        timeStamps: true,
        underscore: true
    }
    let Users = sequelize.define( alias, cols, config );
    return Users;
}
module.exports = modelo;