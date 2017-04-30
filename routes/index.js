var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/datatable.ejs', function(req, res, next) {
	res.render('datatable');
});

module.exports = router;
