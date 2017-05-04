/**
 * Created by Vish on 5/1/2017.
 */
var mongoose = require('mongoose');
var mongourl = 'mongodb://teamawsome:FinallyAwsome1#@ds115701.mlab.com:15701/teamawsome'
mongoose.Promise = global.Promise;
var connection = mongoose.createConnection(mongourl);

var devHistoryModel = new mongoose.Schema({
    device_id: {type: mongoose.Schema.Types.ObjectId, ref: 'device'},
    energy_date: {type: Date, default: Date.now,},
    my_number : {type: Number},
    energy_consumed: {type: Number}
});

var devUsage = mongoose.model('devusages', devHistoryModel);

module.exports = devUsage;