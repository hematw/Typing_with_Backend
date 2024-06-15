const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");
const Class = require("./class");


class Student extends Model { }

Student.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Class,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Student'
})

module.exports = Student;