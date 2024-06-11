const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../config/db");
const Student = require("./Student");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'id'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},)

module.exports = User;