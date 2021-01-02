module.exports.post = function(req, res, next) {
	var errs = []; 
	if(!req.body.name){
		errs.push('Name is required')
	}
	if(!req.body.img){
		errs.push('Image is required')
	}
	if(!req.body.tacgia){
		errs.push('Author is required')
	}
	if(!req.body.trangthai){
		errs.push('Status is required')
	}
	if(!req.body.link){
		errs.push('Link is required')
	}
	if(!req.body.chap){
		errs.push('Chap is required')
	}
	if(errs.length > 0){
		res.render('truyen/post', {
			errors : errs,
			value : req.body
		});
		return;
	}
	next();
}