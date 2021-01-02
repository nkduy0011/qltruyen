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
	db.set('truyens.chap', truyen.chap++)
  .write()
	res.redirect('/truyen/'+ id);
};