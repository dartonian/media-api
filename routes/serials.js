const express = require('express'),
	  router = express.Router(),
	  SerialsModel = require('../bd/mongoose').SerialsModel;

router.get('/', function(req, res, next) {
    SerialsModel.find({}, function(err, serials){
        if(err){
          console.log(err);
        } else{
            return res.send({ status: 'OK', serials });
        }
    })
});

module.exports = router;
