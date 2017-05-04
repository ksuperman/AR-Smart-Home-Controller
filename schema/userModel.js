var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);

var userModel = new mongoose.Schema({
	first_name: {type: String},
	last_name: {type: String},
	email_id: {type: String},
	password: {type: String}
});

var user = mongoose.model('user', userModel);

module.exports = user;