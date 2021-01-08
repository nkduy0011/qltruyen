require('dotenv').config();

var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var truyens = require('./models/truyen.model');
var apiTruyenRoute = require('./api/routes/truyen.route')
var truyenrouter = require('./routes/truyen.route');
var usersrouter = require('./routes/users.route');
var usermiddleware = require('./middleware/user.middleware');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET),);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.use('/api/truyens', apiTruyenRoute)
app.use('/truyen', usermiddleware.requireuser, truyenrouter);
app.use('/user', usersrouter);

app.get('/', async function (req, res) {
	var page = parseInt(req.query.page) || 1;
	var perpage = 4;

	var begin = (page-1)*4;
	var end = page*4;

	var truyen = await truyens.find();
	res.render('index',{
		truyens: truyen.slice(begin,end),
		page: page
	});
});

app.get('/search', async function(req, res){
	var q = req.query.q;

	var truyen = await truyens.find();

	var matchTruyen = truyen.filter(function(truyen) {
		if(q){
			return truyen.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
		}
		else
			return truyen.name.indexOf(q) != -1;
	});
	res.render('index', {
		truyens: matchTruyen,
		value: q
	})
});

app.listen(port);