var users = require('../models/user.model');

module.exports.requireuser = async function(req, res, next){
	if(!req.signedCookies.userId){
		res.redirect('/user/login');
	return;
	}
	var user = await users.find({ id: req.signedCookies.userId});
	if(!user){
		res.redirect('/user/login');
	return;
	}
	res.locals.user = user;
	next();
};