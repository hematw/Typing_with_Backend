const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");


class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Role'
});

module.exports =  Role;