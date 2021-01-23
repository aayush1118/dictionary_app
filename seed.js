const data = [
	{
		word: 'fire',
		category: 'noun',
		definitions:
			'combustion or burning, in which substances combine chemically with oxygen from the air and typically give out bright light, heat, and smoke',
		example: [
			{
				text: 'his house was destroyed by fire',
			},
		],
	},
	{
		word: 'climb',
		category: 'verb',
		definitions:
			'go or come up (a slope, incline, or staircase), especially by using the feet and sometimes the hands; ascend',
		example: [
			{
				text: 'we began to climb the hill',
			},
			{
				text: 'the air became colder as they climbed higher',
			},
			{
				text: 'he climbed up the steps slowly',
			},
		],
	},
	{
		word: 'world',
		category: 'noun',
		definitions:
			'the earth, together with all of its countries, peoples, and natural features',
		example: [
			{
				text: 'he was doing his bit to save the world',
			},
		],
	},
];
function seedDb() {
	db.remove({}, () => {
		for (const word of data) {
			db.create(word);
		}
	});
}

module.exports = seedDB;
