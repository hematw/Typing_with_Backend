require("dotenv").config()
const { Sequelize } = require("sequelize");

const { MYSQL_DB, MYSQL_USER, MYSQL_PASS, MYSQL_HOST } = process.env;

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASS, {
    dialect: "mysql",
    host: MYSQL_HOST,
    logging:false,
})

sequelize.authenticate()
    .then(r => console.log("Database connected successfully! 🚀"))
    .catch(e => console.log(e))


module.exports = sequelize;