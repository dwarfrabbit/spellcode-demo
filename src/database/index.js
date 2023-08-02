const Sequelize = require('sequelize');

const db = new Sequelize('dbname', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = db;