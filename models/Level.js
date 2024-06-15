const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Level extends Model {}

Level.init({
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Level'
})

module.exports = Level;