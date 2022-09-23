const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Entry = sequelize.define('entry', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Entry;