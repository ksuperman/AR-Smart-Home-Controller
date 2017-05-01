var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);

var utilityModel = new mongoose.Schema({
	utility_month: {type: String},
	water_usage: {type: Number},
	gas_usage: {type: Number},
	electricity_usage: {type: Number}
});

var utility = mongoose.model('utilityUsage', utilityModel);

module.exports = utility;