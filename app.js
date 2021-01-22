const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./models/');
const axios = require('axios');
const path = require('path');

//connecting to db
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('///Mongoose is connected///');
});

const PORT = process.env.PORT || 4000;
console.log(PORT);
const app = express();

app.use(cors());
app.use(express.json());

//initiating axios func

const instance = axios.create({
	baseURL: 'https://od-api.oxforddictionaries.com',
	headers: {
		Accept: 'application/json',
		app_id: '6ff6b1e8',
		app_key: 'd3c848f8d6c5597fa1e377d52c3db6f6',
	},
});

//routes for home post and id
app.get('/api/', async (req, res) => {
	const results = await db.find({});
	res.json(results);
});

app.post('/api/create', async (req, res) => {
	const lang = 'en-us';
	const input = req.body.input;
	console.log(input);
	try {
		instance
			.get(`/api/v2/entries/${lang}/${input}`)
			.then((result) => {
				const base =
					result.data.results[0].lexicalEntries[0].entries[0]
						.senses[0];

				const newWord = {
					word: result.data.word,
					category:
						result.data.results[0].lexicalEntries[0].lexicalCategory
							.id,
					definitions: base.definitions[0],
					example: base.examples,
				};
				db.create(newWord)
					.then((word) => res.json(word))
					.catch((err) => res.status(500).send(err.message));
			})
			.catch((err) => res.send(err));
	} catch (err) {
		console.error(err);
	}
});

app.get('/api/:id', (req, res) => {
	const id = req.params.id;
	db.findById(id, (err, word) => {
		res.json(word);
	});
});

//serve static assets
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, 'frontend', 'build', 'index.html')
		);
	});
}

app.listen(PORT, () => {
	console.log('***server started***');
});
