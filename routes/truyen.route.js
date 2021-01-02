var express = require('express');
var router = express.Router();

var controller = require('../controllers/truyen.controller');

var validate = require('../validate/post.validate');

router.get('/post', controller.renderpost);

router.post('/post', validate.post, controller.post);

router.get('/:id', controller.view);

router.post('/:id', controller.pluschap);

module.exports = router;