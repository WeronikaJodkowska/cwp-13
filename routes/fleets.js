const express = require('express');
let router = express.Router();
const db = require('./db').db;

router.get('/readall', function(req, res){
    db.fleets.findAll()
        .then(fleets=> res.json(fleets));
});

router.post('/create', function (req, res, next){
    let fleet = db.fleets.build({name: req.body.name});
    fleet.validate()
        .then((result)=>{
            db.fleets.create(result.dataValues,
                {
                    where:{
                        id: req.params.id
                    }
                }).then(result => res.json(result))
        })
        .catch(errors=> {
            return next({errors: errors});
        })
});
router.get('/read/:id', preRes, read);
router.post('/update/:id', preRes, update);
router.post('/delete/:id', preRes, deleteItem);

async function preRes(req, res, next){
    await db.fleets.findById(req.params.id)
        .then((fleets)=> req.dataPreProc = fleets);
    if (req.dataPreProc === null) return next({message: "No such item"});
    return next();
}

function read(req, res){
    res.json(req.dataPreProc);
}

function update(req, res, next){
    let fleet = {name: req.body.name};
    db.fleets.update(fleet,
        {
            where:{
                id: req.params.id
            }
        }).then(() => res.json(fleet));
}

function deleteItem(req, res){
    db.fleets.destroy({
        where:{
            id: req.params.id,
            deletedAt: null
        }
    })
        .then(fleet => res.json(fleet));
}

module.exports = router;