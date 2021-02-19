var express = require('express');

var multer  = require('multer');

var router = express.Router();

var upload = multer({ dest: './public/uploads/' });

var controller = require('../controllers/truyen.controller');

var validate = require('../validate/post.validate');

router.get('/post', controller.renderpost);

router.post('/post', upload.single('img'),validate.post, controller.post);

router.post('/del/:id', controller.del);

router.get('/view/:id', controller.view);

router.post('/plushchap/:id', controller.pluschap);

module.exports = router;