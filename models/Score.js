const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Score = sequelize.define('Score', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    levelId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    point: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = Score;