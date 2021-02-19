var express = require('express');

var router = express.Router();

var multer  = require('multer');

var upload = multer({ dest: './public/uploads/' });

var validate = require('../../validate/post.validate')

var controller = require('../controllers/truyen.controller');

router.get('/', controller.index);

router.post('/', upload.single('img'),validate.post, controller.post);

module.exports = router;