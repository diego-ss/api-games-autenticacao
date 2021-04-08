const Sequelize = require("sequelize");

const connection = new Sequelize("gamesdb", 'root', 'Diego!1996', {
    host: "localhost",
    dialect: "mysql",
    timezone: '-03:00'
});

module.exports = connection;