const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list from database
router.get('/ninjas', function(req, res, next) {
    // Ninja.find({}).then(function(ninja){
    //     res.send(ninja)
    // })
    Ninja.geoNear(
        {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 10000, spherical: true}
    ).then(function(ninja){
        res.send(ninja);
    });
});

//add a new ninja
router.post('/ninjas', function(req, res, next) {
    // var ninja = new Ninja(req.body);
    // ninja.save();
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next)
    // res.send({
    //     type: 'post',
    //     name: req.body.username,
    //     rank: req.body.rank
    // })
});

// update a ninja to a database
router.put('/ninjas/:id', function(req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        Ninja.findOne({_id: req.params.id}).then(function(ninja) {
            res.send(ninja);
        })
    })
    // res.send({ type: 'put'})
});

// delete a ninja from the database
router.delete('/ninjas/:id', function(req, res, next) {
    // console.log(req.params.id);
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja) {
        res.send(ninja);
    })
    // res.send({ type: 'delete'})
});

module.exports = router;