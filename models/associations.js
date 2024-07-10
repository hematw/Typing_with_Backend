const Level = require("./Level");
const Role = require("./Role");
const Score = require("./Score");
const User = require("./User");
const Text = require("./Text");


Role.hasMany(User, { foreignKey: 'roleId' })
User.belongsTo(Role, { foreignKey: 'roleId' })

Level.hasMany(Score, { foreignKey: 'levelId' })
Score.belongsTo(Level, { foreignKey: 'levelId' })

Level.hasMany(Text, { foreignKey: 'levelId' })
Text.belongsTo(Level, { foreignKey: 'levelId' })

module.exports = {
    User, Score, Role, Level, Text
}