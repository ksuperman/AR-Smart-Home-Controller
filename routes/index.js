var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/datatable', function(req, res, next) {
	res.render('datatable');
});

router.get('/devicemanagement',function(req, res, next) {
    res.render('devicemanagement');
});

router.get('/devdash',function(req, res, next) {
    res.render('devicedashboard',{id:req.query.id});
});

module.exports = router;
