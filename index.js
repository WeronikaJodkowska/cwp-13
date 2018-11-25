const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const data = require('./data');

const Promise = require('bluebird');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());

const fleets = require('./routes/fleets');
const motions = require('./routes/motions');
const vehicles = require('./routes/vehicles');
const milage = require('./routes/motions');

const models = [db.fleets, db.vehicles, db.motions];

app.use('/api/fleets', fleets);
app.use('/api/motions', motions);
app.use('/api/vehicles', vehicles);
app.use('/api/vehicles', milage);
app.use('*', function(err, req, res, next){
    if(req.baseUrl.includes('read')){
        err.status = 404;
    }else{err.status = 400;}
    res.status = err.status;
    res.json(err);
    next();
});

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});

//SCRIPT GENERATE DB WITH INSERTING DATA
(async ()=> {
    await db.sequelize.sync({force: true});
    Promise.all(models).then((resolve, reject) => {
        models.forEach(async function (model) {
            await model.bulkCreate(data[model.name]);
        })
    });
})();