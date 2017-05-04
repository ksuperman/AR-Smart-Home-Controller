var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var deviceModel = new mongoose.Schema({
	device_name: {type: String},
	device_img_path:{type:String},
	device_id: {type: Number, unique: true},
	device_util_startTime: {type: Date, default: Date.now,},
	device_util_endTime: {type: Date, default: +new Date() + 2*60*60*1000},
	device_energy_consumption: {type: Number}
});

deviceModel.plugin(autoIncrement.plugin, {model: 'device', field: 'device_id'});

var device = mongoose.model('device', deviceModel);

module.exports = device;