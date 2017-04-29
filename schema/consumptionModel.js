var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var energyModel = new mongoose.Schema({
	device_id: {type: mongoose.Schema.Types.ObjectId, ref: 'device'},
	device_util_date: {type: Date, default: Date.now,},
	device_energy_consumption: {type: Number}
});

var energyConsumption = mongoose.model('energyConsumption', energyModel);

module.exports = energyConsumption;