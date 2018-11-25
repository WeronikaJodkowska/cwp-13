const express = require('express');
let router = express.Router();
const db = require('./db').db;

router.post('/create', async function(req, res, next){
    let vehicle = db.vehicles.build({name: req.body.name, fleetId: req.body.fleetId}), fleet;
    vehicle.validate()
        .catch(errors=> {
            return next({errors: errors});
        });
    await db.fleets.findById(req.body.fleetId)
        .then((res)=> fleet = res);
    if (fleet === null) return next({message: "No such fleet"});
    db.vehicles.create(vehicle.dataValues)
        .then(vehicle => res.json(vehicle));
});

router.get('/readall/:id', preFleet, readAll);
router.get('/read/:id', preVechicle, read);
router.post('/update/:id', preVechicle, update);
router.post('/delete/:id', preVechicle, deleteItem);

async function preFleet(req, res, next){
    await db.fleets.findOne({
        where:{id: req.params.id},
        include:[{
            model: db.vehicles,
            as: 'vehicles'
        }
        ]
    })
        .then((res)=> req.dataPreProc = res);
    if (req.dataPreProc === null) return next({message: "No such item"});
    return next();
}

async function preVechicle(req, res, next){
    await db.vehicles.findOne({where: {id: req.params.id}})
        .then((res)=> req.dataPreProc = res);
    if (req.dataPreProc  === null) return next({message: "No such item"});
    next();
}


function read(req, res){
    res.json(req.dataPreProc);
}

function update(req, res){
    let vehicle = {name: req.body.name};
    db.vehicles.update(vehicle,
        {
            where:{
                id: req.params.id
            }
        })
        .then(() => res.json(vehicle));
}

function deleteItem(req, res){
    db.vehicles.destroy({
        where:{
            id: req.params.id,
            deletedAt: null
        }
    })
        .then(fleet => res.json(fleet));
}

function readAll(req, res){
    res.json(req.dataPreProc.vehicles);
}

module.exports = router;