var express = require('express');
var router = express.Router();
var controller = require('../controllers/truyen.controller')

router.get('/post', controller.renderpost);

router.post('/post', controller.post);

router.get('/search', controller.search);

router.get('/:id', controller.view);

router.post('/:id', controller.pluschap);

module.exports = router;