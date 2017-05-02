/**
 * Created by Vish on 5/1/2017.
 */
var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);

var devHistoryModel = new mongoose.Schema({
    device_id:{type: Number},
    my_number: {type: Number},
    energy_date: {type: Date},
    energy_consumed: {type: Number}
});

var devUsage = mongoose.model('devUsage', devHistoryModel);

module.exports = devUsage;