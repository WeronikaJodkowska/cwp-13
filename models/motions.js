module.exports = (Sequelize, sequelize) => {
    return sequelize.define('motions', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: Sequelize.DOUBLE,
            validate: {
                notEmpty: true,
                isFloat: true
            }
        },
        longitude:{
            type:Sequelize.DOUBLE,
            validate: {
                notEmpty: true,
                isFloat: true
            }
        },
        time: Sequelize.DATE,
        vehicleId: {
            type:Sequelize.INTEGER,
            validate: {
                notEmpty: true,
                isInt: true
            }
        }
    }, {
        getterMethods: {
            latLng() {
                return{ latitude: this.latitude,
                    longitude: this.longitude}
            }
        }
    });
};