const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./models/');
const axios = require('axios');

//connecting to db
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/dictionary_app',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

mongoose.connection.on('connected', () => {
	console.log('///Mongoose is connected///');
});

const PORT = 4000 || process.env.PORT;

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
app.get('/', async (req, res) => {
	const results = await db.find({});
	res.json(results);
});

app.post('/create', async (req, res) => {
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

app.get('/:id', (req, res) => {
	const id = req.params.id;
	db.findById(id, (err, word) => {
		res.json(word);
	});
});

if (process.env.NODE_ENV === 'produciton') {
	app.use(express.static('client/build'));
}

app.listen(PORT, () => {
	console.log('***server started***');
});
