const express = require('express');
const router = express.Router();
const Compare = require('../models/compare');

// get list of drug price fro db
    router.get('/compare', (req, res, next) => {
        Compare.find({}, (err, compare) => {
          if (err) {
            res.send(err);
          }
          res.json(compare);
        
      });
    
});

// add a new drug price & details to the db
router.post('/compare', function(req, res, next){
    Compare.create(req.body).then(function(compare){
        res.send(compare);
    }).catch(next);
});

// update a drug price in the db
router.put('/compare/:id', function(req, res, next){
    Compare.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Compare.findOne({_id: req.params.id}).then(function(compare){
        res.send(compare);
        });
    });
    
});

// delete drug price from the db
router.delete('/compare/:id', function(req, res, next){
    Compare.findByIdAndDelete({_id: req.params.id}).then(function(compare){
        res.send(compare);
    })
});


module.exports = router;