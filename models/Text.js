const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Level = require("./Level");


const Text = sequelize.define('Score', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    levelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Level,
            key: id
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Text;