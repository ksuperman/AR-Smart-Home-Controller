var express = require('express');
var router = express.Router();
var i18n = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('ar_controller', { title: 'AR Smart Home Controller', i18n: res });
});

module.exports = router;
