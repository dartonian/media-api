const express = require('express'),
	    router = express.Router(),
	    FilmsModel = require('../bd/mongoose').FilmsModel;

router.get('/', function(req, res, next) {
    FilmsModel.find({}, function(err, films){
        if(err){
          console.log(err);
        } else{
            return res.send({ status: 'OK', films });
        }
    })
});

module.exports = router;
