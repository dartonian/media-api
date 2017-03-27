const express = require('express'),
	  router = express.Router(),
	  fs = require('fs'),
	  config = require('./config'),
      FilmsModel = require('../bd/mongoose').FilmsModel,
      SerialsModel = require('../bd/mongoose').SerialsModel;

function logResp(err, files){
	if(err) {
		console.log(err);
	} else {
		return files;
	}
}

function replaceFormat(name) {
	return name.replace('.mp4','');
}

router.get('/', function(req, res, next) {

	const films = (__dirname + '/../public/content/films');
	const serials = (__dirname + '/../public/content/serials');

	const filmsList = fs.readdirSync(films).map((file) => ({
			title: replaceFormat(file),
			url: `/public/content/films/${file}`
		}));

	let counter = (function(){
		let i = 1;
		return function(){
			return i++;
		}
	}());

	filmsList.forEach((film,i) => {
		
		const filmModel = new FilmsModel({
			title: film.title,
			url: film.url
		});

		filmModel.save((err) => {

	        if (!err) {
	            console.log("films base created");
	        } else {
	            console.log(err);
	            if(err.name == 'ValidationError') {
	                res.statusCode = 400;
	                res.send({ error: 'Validation error' });
	            } else {
	                res.statusCode = 500;
	                res.send({ error: 'Server error' });
	            }
	            console.log('Internal error(%d): %s',res.statusCode,err.message);
	        }
	        
	    });
	});

	const serialsList = fs.readdirSync(serials).map(x => {

		let currentSerialSeason = fs.readdirSync(`${serials}/${x}`),
			items = [];

		currentSerialSeason.map((y,i) => {
			items.push({
				season: 's0' + (i+1),
				series: fs.readdirSync(`${serials}/${x}/${y}`)
			});
		});

		return {
			title: x,
			seasons: items
		}

	});


	serialsList.forEach((serial,i) => {
		
		const serialsModel = new SerialsModel({
			title: serial.title,
			seasons: serial.seasons
		});

		serialsModel.save((err) => {

	        if (!err) {
	            console.log("serials base created");
	            if(counter() == serialsList.length) {
	            	return res.send({ status: 'OK', serialsList });
	            	console.log('end');
	            }
	        } else {
	            console.log(err);
	            if(err.name == 'ValidationError') {
	                res.statusCode = 400;
	                res.send({ error: 'Validation error' });
	            } else {
	                res.statusCode = 500;
	                res.send({ error: 'Server error' });
	            }
	            console.log('Internal error(%d): %s',res.statusCode,err.message);
	        }
	        
	    });
	});
});

module.exports = router;