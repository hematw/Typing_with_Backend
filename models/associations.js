const Level = require("./Level");
const Role = require("./Role");
const Score = require("./Score");
const Student = require("./Student");
const User = require("./User");
const Class = require("./class");
const Text = require("./Text");

Student.hasOne(User, { foreignKey: 'studentId' })
User.belongsTo(Student, { foreignKey: 'studentId' })

Role.hasMany(User, { foreignKey: 'roleId' })
User.belongsTo(Role, { foreignKey: 'roleId' })

Level.hasMany(Score, { foreignKey: 'levelId' })
Score.belongsTo(Level, { foreignKey: 'levelId' })

Class.hasMany(Student, { foreignKey: 'classId' })
Student.belongsTo(Class, { foreignKey: 'classId' })

Level.hasMany(Text, { foreignKey: 'levelId' })
Text.belongsTo(Level, { foreignKey: 'levelId' })

module.exports = {
    Student, User, Score, Role, Level, Class, Text
}