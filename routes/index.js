var express = require('express');
var router = express.Router();
var queryExec = require("./Query_Executor");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/datatable', function(req, res, next) {
	res.render('datatable');
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

router.post('/login', function(req, res, next) {
	
	var loginInfo, queryString;
	
	console.log("Inside Server's login function...");
	
	loginInfo = req.body;
	
	//Check if the Email ID and Password exists in the system.
	
	queryString = "SELECT email_id FROM users WHERE email_id = '" + loginInfo.loginEmail + "' AND password = '" + loginInfo.loginPass + "'";  
	console.log("Login Query is: "+ queryString);
	
	
	queryExec.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
				
				if(results.length > 0){
					req.session.emailId = loginInfo.loginEmail;
					console.log("Allow Login");
					res.end("Logged in successfully.");
				}
				
				else{
					console.log("Invalid Login...");
				}
			
			}	
		},queryString);

});

router.post('/signUp', function(req, res, next) {

	var signUpInfo, queryString;
	
	console.log("Inside Server's SignUp function...");
	
	signUpInfo = req.body;
	
	//Check if the Email ID user is giving while creating an account already exists. If yes then, don't allow to create an account.
	
	queryString = "SELECT email_id FROM users WHERE email_id = '" + signUpInfo.emailId + "'";  
	console.log("Account already exists Query is: "+ queryString);
	
	
	queryExec.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
				
				if(results.length > 0){
					console.log("Email ID already exists");
					res.end("This Email ID already exists. Please choose unique email ID.");
				}
				
				else{
					console.log("Creating account...");
					
					queryString = "INSERT INTO users (`email_id`, `fname`, `lname`, `password`) VALUES ('" + signUpInfo.emailId + "', '" + signUpInfo.fName + "', '" + signUpInfo.lName + "', '" + signUpInfo.password + "')";  
					console.log("Sign Up Query is: "+ queryString);
					
					queryExec.fetchData(function(err,results){
						if(err){
							throw err;
						}
						else 
						{
								req.session.emailId = signUpInfo.emailId;
								console.log("Successful Sign UP");
								res.end("Congratulations!!! Your account has been created successfully.");
								
						}	
					},queryString);

				}
			
			}	
		},queryString);
});

router.get('/devicemanagement',function(req, res, next) {
    res.render('devicemanagement');
});

router.get('/devdash',function(req, res, next) {
    res.render('devicedashboard',{id:req.query.id});

});

module.exports = router;
