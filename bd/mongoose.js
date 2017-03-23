const mongoose = require('mongoose'),
	  config = require('../routes/config');

mongoose.connect('mongodb://localhost/testDB');

const db = mongoose.connection;

db.on('error', (err) => {
    console.log('error:', err.message);
});

db.once('open', () => {
	mongoose.connection.db.dropDatabase();
    console.log("success");
});

const Schema = mongoose.Schema,
	  Films = new Schema({
		  title: String,
	  	  url: String,
	  }),
	  Serials = new Schema({
	  	title: String,
	  	seasons: []
	  }),
	  FilmsModel = mongoose.model('Films', Films),
	  SerialsModel = mongoose.model('Serials', Serials);

module.exports.FilmsModel = FilmsModel;
module.exports.SerialsModel = SerialsModel;