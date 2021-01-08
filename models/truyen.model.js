const mongoose = require('mongoose');

const truyenSchema = new mongoose.Schema({
	name: String,
	img : String,
	tacgia : String,
	trangthai : String,
	link : String,
	chap : String
});

const truyen = mongoose.model('truyen', truyenSchema, 'truyens');

module.exports = truyen;