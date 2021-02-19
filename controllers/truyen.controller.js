var truyens = require('../models/truyen.model');

module.exports.renderpost = function(req, res){
	res.render('truyen/post');
};

module.exports.post = async function (req, res){
	if(req.file){
		req.body.img = req.file.path.slice(7);
	}
	await truyens.create(req.body);
	res.redirect('/');	
};

module.exports.view = async function(req, res){
	var id = req.params.id;
	var truyen = await truyens.findById(id);
	res.render('truyen/view', {
		truyens : truyen
	});
};

module.exports.pluschap = async function (req, res){
	var id = req.params.id;
	var newchap = parseInt(req.body.chap) + 1;
	await truyens.findByIdAndUpdate(id, {"chap": newchap});
	res.redirect('/truyen/view/'+ id);
};

module.exports.del = async function (req, res){
	var id = req.params.id;
	await truyens.deleteOne({"_id": id});
	res.redirect('/');
};