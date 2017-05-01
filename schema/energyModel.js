var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);

var energyModel = new mongoose.Schema({
	energy_date: {type: Date},
	energy_consumed: {type: Number},
	devices_used: {type: Number},
	time_usage: {type: Number}
});

var device = mongoose.model('energyUsage', energyModel);

module.exports = device;