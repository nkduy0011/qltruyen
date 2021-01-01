var express = require('express')
var app = express();
var Truyenrouter = require('./routes/truyen.route')

var db = require('./db');

var port = 3000;

const shortid = require('shortid');

var bodyParser = require('body-parser');

app.use('/truyen', Truyenrouter);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index',{
  	truyens: db.get('truyens').value()
  });
});

app.listen(port);