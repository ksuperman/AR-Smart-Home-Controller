var express = require('express');
var router = express.Router();
var i18n = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {

	if(req.ClientSession.emailId){
		res.render('ar_controller', { fName: req.ClientSession.fName, lName: req.ClientSession.lName, title: 'AR Smart Home Controller', i18n: res });
	} else{
		res.redirect("/homepage");
	}

});

module.exports = router;
