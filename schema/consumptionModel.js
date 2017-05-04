var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var energyModel = new mongoose.Schema({
	device_id: {type: mongoose.Schema.Types.ObjectId, ref: 'device'},
	energy_date: {type: Date, default: Date.now,},
	my_number : {type: Number},
	device_util_startTime: {type: Date, default: Date.now,},
	device_util_endTime: {type: Date, default: +new Date() + 2*60*60*1000},
	energy_consumed: {type: Number}
});


var energyConsumption = mongoose.model('devusages', energyModel);

module.exports = energyConsumption;