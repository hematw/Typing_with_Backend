require("dotenv").config();
const MySQLConnector = require("../mysql");

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
};

const dbConn = new MySQLConnector(dbConfig);
dbConn.connect((err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("Database connected successfully! 🚀")
});

module.exports = dbConn;