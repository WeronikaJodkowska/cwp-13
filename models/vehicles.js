module.exports = (Sequelize, sequelize) => {
    return sequelize.define('vehicles', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(500),
            validate: {
                notEmpty: true
            }
        },
        fleetId:{
            type:Sequelize.INTEGER,
            validate: {
                isInt: true,
                notEmpty: true
            }
        }
    });
};