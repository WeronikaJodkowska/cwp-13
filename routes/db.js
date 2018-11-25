const db = {};
db.Sequelize = require('sequelize');
db.config = require('../config.json');
db.db = require('../models')(db.Sequelize, db.config);

module.exports = db;