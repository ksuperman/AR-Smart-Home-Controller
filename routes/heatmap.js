var express = require('express');
var router = express.Router();

/* POST home page. */
router.post('/getEnergy', function(req, res) {
	
  res.render('heatmap', { title: 'Express' });
});


router.get('/', function(req, res) {
	
	  res.render('heatmap', { title: 'Express' });
	});

module.exports = router;
