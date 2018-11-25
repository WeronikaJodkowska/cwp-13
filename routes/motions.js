const express = require('express');
let router = express.Router();
const db = require('./db').db;
const geolib =require('geolib');

router.get('/milage/:id', preProc, getPathLength);

async function preProc(req, res, next){
    await db.vehicles.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {model: db.motions}
        ]
    })
        .then((res)=> req.dataPreProc = res);
    if (req.dataPreProc  === null) return next({message: "No motions"});
    next();
}

function getPathLength(req, res){
    let vMotions = [];
    req.dataPreProc.motions.forEach(function(element){
        vMotions.push(element.latLng);
    });
    res.json({pathLength: (geolib.getPathLength(vMotions))});
}
module.exports = router;