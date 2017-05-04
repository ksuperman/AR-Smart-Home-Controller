var express = require('express');
var router = express.Router();
var queryExec = require("./Query_Executor");
var user = require('../schema/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.ClientSession.emailId){
		res.render('index', { title: 'Express' });
	} else{
		res.redirect("/homepage");
	}
});

router.get('/datatable', function(req, res, next) {

	if(req.ClientSession.emailId){
		res.render('datatable');
	} else{
		res.redirect("/homepage");
	}

	
});


router.get('/heatmap', function(req, res, next) {

	if(req.ClientSession.emailId){
		res.render('heatmap');
	} else{
		res.redirect("/heatmap");
	}

	
});

router.get('/homepage', function(req, res, next) {
	res.render('homepage', { title: 'HomePage' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Sign Up' });
});

router.get('/logout', function(req, res, next) {
	console.log("logout");
	req.ClientSession.destroy();
	res.redirect("/");
});

router.post('/login', function(req, res, next) {
	
	var loginInfo, queryString;
	
	console.log("Inside Server's login function...");
	
	loginInfo = req.body;
	
	user.findOne({ email_id: loginInfo.email}, function (err, document){
        if(err){
            console.log(err);
            throw err;
        } else{
        	req.ClientSession.emailId = loginInfo.email;
        	req.ClientSession.fName = document.first_name;
        	req.ClientSession.lName = document.last_name;
			console.log("Allow Login");
			res.redirect("/");
        }
        
    });

});

router.post('/signUp', function(req, res, next) {

	var signUpInfo, queryString;
	
	console.log("Inside Server's SignUp function...");
	
	signUpInfo = req.body;
	
	var userInstance = new user({
		first_name: signUpInfo.fName,
		last_name: signUpInfo.lName,
		email_id: signUpInfo.email,
		password: signUpInfo.password
	});

	userInstance.save(function (err) {
		if (err) {
			res.send("error");
		} else {
			req.ClientSession.emailId = signUpInfo.email;
			req.ClientSession.fName = document.first_name;
        	req.ClientSession.lName = document.last_name;
			console.log("Successful Sign UP");
			res.redirect("/");
		}
	});

});

router.get('/devicemanagement',function(req, res, next) {

	if(req.ClientSession.emailId){
		res.render('devicemanagement');
	} else{
		res.redirect("/homepage");
	}
    
});

router.get('/devdash',function(req, res, next) {

	if(req.ClientSession.emailId){
		res.render('devicedashboard',{id:req.query.id});
	} else{
		res.redirect("/homepage");
	}

});

module.exports = router;
