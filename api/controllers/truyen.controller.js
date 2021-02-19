var truyens = require('../../models/truyen.model');

module.exports.index = async function(req, res){
	var truyen = await truyens.find();
	res.json(truyen);
};

module.exports.post = async function (req, res){
	if(req.file){
		req.body.img = req.file.path.slice(7);
	}
	var truyen = await truyens.create(req.body);
	res.json(truyen);	
};
