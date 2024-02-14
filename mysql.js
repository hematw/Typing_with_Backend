const mysql = require("mysql");

class MySQLConnector {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    connect(callback) {
        this.connection.connect((err) => {
            if (err) {
                console.error("Eroor connecting Database", err)
            }
            callback(err)
        });
    }

    create(table, data, callback) {
        let sql = `INSERT INTO ${table} SET ?`;

        this.connection.query(sql, data, (err, result) => {
            if (err) {
                console.error("Error on Inserting data: ", err);
            }

            callback(err, result)
        })
    }

    read(table, condition = {}, callback) {
        let query = `SELECT * FROM ${table}`;

        if (Object.keys(condition).length > 0) {
            query += ' WHERE ?';
        }

        this.connection.query(query, condition, (err, results) => {
            if (err) {
                console.error('Error reading records:', err);
            }

            callback(err, results);
        });
    }

    update(table, data, condition, callback) {
        let sql = `UPDATE ${table} SET ? WHERE ?`;

        this.connection.query(sql, [data, condition], (err, result) => {
            if (err) {
                console.error("Error on Updating data: ", err);
            }

            callback(err, result)
        })
    }

    delete(table, condition, callback) {
        let sql = `DELETE FROM ${table} WHERE ?`;

        this.connection.query(sql, condition, (err, result) => {
            if (err) {
                console.error("Error on updating table: ", err.message);
            }

            callback(err, result)
        })
    }

    query(sql, callback) {
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.error("Error on executing query: ", err.message);
            }

            callback(err, result)
        })
    }
}

module.exports = MySQLConnector;