const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Class = sequelize.define('Class', {
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
})

module.exports = Class