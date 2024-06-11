const Level = require("./Level");
const Role = require("./Role");
const Score = require("./Score");
const Student = require("./Student");
const User = require("./User");
const Class = require("./class");
const Text = require("./Text");

Student.hasOne(User, { foreignKey: 'id' })
User.belongsTo(Student, { foreignKey: 'id' })

User.hasMany(Role, { foreignKey: 'id' })
Role.belongsToMany(User, { foreignKey: 'id' })

Score.belongsTo(Level, { foreignKey: 'id' })
Level.hasMany(Score, { foreignKey: 'id' })

Class.hasMany(Student, { foreignKey: 'id' })
Student.belongsTo(Class, { foreignKey: 'id' })

Text.belongsTo(Level, { foreignKey: 'id' })
Level.hasMany(Text, {foreignKey: 'id'})