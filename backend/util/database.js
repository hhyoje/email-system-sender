const Sequelize = require('sequelize');

const sequelize = new Sequelize('emailsystem', 'root', 'onetwo', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;