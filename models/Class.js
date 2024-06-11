const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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