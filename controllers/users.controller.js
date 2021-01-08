var md5 = require('md5');
var users = require('../models/user.model');

module.exports.login = function(req, res){
	res.render('user/login');
};
module.exports.postlogin = async function(req,res){
	var email = req.body.email;
	var password = req.body.password;

	var user = await users.find({ "email": email});

	if(!user){		
		res.render("user/login", {
			errors: [
				"User does not exist."
			],
			value: req.body
		});
		return;
	}

	if(user[0].password !== md5(password)){
		res.render("user/login", {
			errors: [
				"Password is wrong."
			],
			value: req.body
		});
		return;
	}
	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/');
}