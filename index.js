var express = require('express')
var app = express();
var truyenrouter = require('./routes/truyen.route');
var usersrouter = require('./routes/users.route');
var usermiddleware = require('./middleware/user.middleware');

var db = require('./db');

var port = 3000;

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

app.use('/truyen', usermiddleware.requireuser, truyenrouter);
app.use('/user', usersrouter);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index',{
  	truyens: db.get('truyens').value()
  });
});

app.get('/search', function(req, res){
	var q = req.query.q;
	var matchTruyen = db.get('truyens').value().filter(function(truyen) {
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