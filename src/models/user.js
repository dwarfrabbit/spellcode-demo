const db = require('../database')
const {DataTypes, Model} = require('sequelize')

class User extends Model {}

User.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize: db,
    modelName: 'User',
    tableName: 'users'
})

module.exports = User