const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


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
}, {
    paranoid: true
})

module.exports = Score;