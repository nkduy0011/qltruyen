var db = require ('../db')

const shortid = require('shortid');

module.exports.renderpost = function(req, res){
	res.render('truyen/post');
};

module.exports.post = function (req, res){
	req.body.id = shortid.generate();
	db.get('truyens').push(req.body).write();
	res.redirect('/');
};

module.exports.search = function(req, res){
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
};

module.exports.view = function(req, res){
	var id = req.params.id;
	var truyen = db.get('truyens')
	.find({ id: id }).value()
	res.render('truyen/view', {
		truyens : truyen
	});
};

module.exports.pluschap = function (req, res){
	var id = req.params.id;
	var truyen = db.get('truyens')
	.find({ id: id }).value()
	var newchap =JSON.stringify(truyen.chap ++);
	db.set('truyens.chap', newchap)
  .write()
	res.redirect('/truyen/'+ id);
};