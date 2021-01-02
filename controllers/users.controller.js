var db = require ('../db')

module.exports.login = function(req, res){
	res.render('user/login');
};
module.exports.postlogin = function(req,res){
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({ email: email}).value();

	if(!user){		
		res.render("user/login", {
			errors: [
				"User does not exist."
			],
			value: req.body
		});
		return;
	}

	if(user.password !== password){
		res.render("user/login", {
			errors: [
				"Password is wrong."
			],
			value: req.body
		});
		return;
	}
	res.cookie('userId', user.id);
	res.redirect('/');
}