module.exports.requireuser = function(req, res, next){
	if(!req.cookies.userId){
		res.redirect('/user/login');
	return;
	}
	next();
};