const sqlite = require('sqlite3');
const { Sequelize } = require("sequelize");

const PATH_TO_DATABASE = __dirname + "/../test.sqlite"

if (!require("fs").existsSync(PATH_TO_DATABASE)) {
    new sqlite.Database(PATH_TO_DATABASE);
}

const database = new Sequelize(
    {
        dialect: "sqlite",
        storage: PATH_TO_DATABASE,
        logging: false
    }
);

// Подключение моделей
require("../models");

global.database = database;

module.exports = database.sync().then(console.log("Database synced"));