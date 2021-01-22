const mongoose = require('mongoose');

//the database model
const db = mongoose.Schema({
	word: { type: String },
	category: { type: String },
	definitions: { type: String },
	example: [
		{
			text: { type: String },
		},
	],
});

module.exports = mongoose.model('db', db);
