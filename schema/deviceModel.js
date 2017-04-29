var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
	mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

var deviceModel = new mongoose.Schema({
	device_name: {type: String},
	device_id: {type: Number, unique: true},
	device_loc: {type: String}
});

deviceModel.plugin(autoIncrement.plugin, {model: 'device', field: 'device_id'});

var device = mongoose.model('device', deviceModel);

module.exports = device;