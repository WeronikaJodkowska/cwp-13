const Fleet = require('./fleets');
const Motion = require('./motions');
const Vehicle = require('./vehicles');

module.exports = (Sequelize, config) => {
    const dbOptions = {
        host: config.db.host,
        dialect: 'mysql',
        define: {
            timestamps: true,
            paranoid: true
        }
    };
    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, dbOptions);
    sequelize
        .authenticate()
        .then(function() {
            console.log('Connected');
        })
        .catch(function (err) {
            console.log('Error:', err);
        });
    const fleets = Fleet(Sequelize, sequelize);
    const motions = Motion(Sequelize, sequelize);
    const vehicles = Vehicle(Sequelize, sequelize);

    fleets.hasMany(vehicles, {foreignKey: "fleetId", sourceKey: "id"});
    vehicles.hasMany(motions, {foreignKey: "vehicleId", sourceKey: "id"});

    return {
        fleets,
        motions,
        vehicles,
        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};