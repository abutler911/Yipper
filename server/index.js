const express = require('express');
const cors = require('cors');
const { response } = require('express');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const db = monk('mongodb+srv://abutler911:abutler911@cluster0.myin7.mongodb.net/<dbname>?retryWrites=true&w=majority');
const yips = db.get('yips');
const filter = new Filter();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Yipper!🐶'
	});
});

app.get('/yips', (req, res) => {
	yips.find().then((yips) => {
		res.json(yips);
	});
});

function isValidYip(yip) {
	return yip.name && yip.name.toString().trim() !== '' && yip.content && yip.content.toString().trim() !== '';
}

app.use(
	rateLimit({
		windowMs: 5 * 1000,
		max: 1
	})
);

app.post('/yips', (req, res) => {
	if (isValidYip(req.body)) {
		const yip = {
			name: filter.clean(req.body.name.toString()),
			content: filter.clean(req.body.content.toString()),
			created: new Date()
		};

		yips.insert(yip).then((createdYip) => {
			res.json(createdYip);
		});

		console.log(yip);
	} else {
		res.status(422);
		res.json({
			message: 'Hey! Name and content is required!'
		});
	}
});

app.listen(5000, () => {
	console.log('Listening on http://localhost:5000');
});
