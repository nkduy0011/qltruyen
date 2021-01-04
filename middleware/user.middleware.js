var db = require ('../db');

module.exports.requireuser = function(req, res, next){
	if(!req.signedCookies.userId){
		res.redirect('/user/login');
	return;
	}
	var user = db.get('users').find({ id : req.signedCookies.userId}).value()
	if(!user){
		res.redirect('/user/login');
	return;
	}
	res.locals.user = user;
	next();
};