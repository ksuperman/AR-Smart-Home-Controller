var express = require('express');
var router = express.Router();
var device = require('../schema/deviceModel');
var energyConsumed = require('../schema/energyModel');
var utilityConsumed = require('../schema/utilityModel');
var devHistory= require('../schema/devHistoryModel');
var moment = require('moment');

/**
 * API SERVICE TO INSERT DEVICE
 */
router.post('/insertDevice', function(req, res, next) {
	console.log("/insertDevice");

	var name = "Washing Machine";
	var energy = Math.ceil(Math.random()*1000);

	var deviceInstance = new device({
		device_name: name,
		device_energy_consumption: energy
	});

	deviceInstance.save(function (err) {
		if (err) {
			res.send("error");
		} else {
			res.send("success");
		}
	});

	/*device.insertMany(arr, function(err, docs){
		if (err) {
			console.log(err);
			res.send("error");
		} else {
			res.send("success");
		}
	});*/
});

/**
 * API SERVICE TO GET ALL DEVICE
 */
router.get('/getAllDevices', function(req, res, next) {
    console.log("/getAllDevices");
    console.log(req.ClientSession.emailId);
    device.find({}, function (err, document) {
        res.send(document);
    });
});

/**
 * API SERVICE TO GET ONE DEVICE
 */
router.get('/getDevice', function(req, res, next) {
    console.log("/getDevice");
    device.findOne({ device_name: "Fan4"}, function (err, document){
        if(err){
            console.log(err);
            throw err;
        }
        res.send(document);
    });
});

/**
 * API TO INSERT ENERGY CONSUMPTION PER DAY
 */
router.get('/insertDevicesEnergy', function(req, res, next) {
	console.log("/insertDevicesEnergy");

	var data = [];
	for(var i = 950; i >=7; i--){
		var date = moment(moment().subtract(i, 'days').calendar(), 

		"MM/DD/YYYY HH:mm").unix()*1000;
		var energy = Math.ceil(Math.random()*1000);
		var timeUsage = Math.ceil(Math.random()*100);
		var devicesUsed = Math.ceil(Math.random()*10);
		data.push({"energy_date" : date,"energy_consumed" : 

			energy,"devices_used" : devicesUsed,"time_usage" : timeUsage});
	}
	energyConsumed.insertMany(data, function(err, docs){
		if (err) {
			console.log(err);
			res.send("error");
		} else {
			res.send("success");
		}
	});
});


/**
 * API TO GET ENERGY CONSUMPTION PER DAY
 */
router.get('/getAllDevicesEnergy', function(req, res, next) {
    console.log("/getAllDevicesEnergy");
    energyConsumed.find({}, function (err, document){
        if(err){
            console.log(err);
            throw err;
        }
        res.send(document);
    });
});

/**
 * API TO INSERT UTILITY CONSUMPTION PER MONTH
 */
router.get('/insertUtilities', function(req, res, next) {
    console.log("/insertUtilities");

    var data = [];
    var month = ["January", "February", "March", "April"];
    var len = month.length;
    for(var i = 0; i < len; i++){
        var utility_month = month[i];
        var water_usage = Math.ceil(Math.random()*100);
        var gas_usage = Math.ceil(Math.random()*100);
        var electricity_usage = Math.ceil(Math.random()*100);
        data.push({"utility_month" : utility_month,"water_usage" :	water_usage,"gas_usage" : gas_usage,"electricity_usage" : electricity_usage});
    }

    utilityConsumed.insertMany(data, function(err, docs){
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send("success");
        }
    });
});

/**
 * API TO GET UTILITY CONSUMPTION PER MONTH
 */
router.get('/getAllUtilityConsumption', function(req, res, next) {
    console.log("/getAllUtilityConsumption");
    utilityConsumed.find({}, function (err, document){
        if(err){
            console.log(err);
            throw err;
        }
        res.send(document);
    });
});

/*This API is used to populate unique devices in device management tab*/
router.get('/getUniqueDevices', function(req, res, next) {
    console.log("/getUniqueDevices");
    device.find().sort('device_id').find( function (err, document) {

        if(err){
            console.log(err);
            throw err;
        }
        res.send(document);
    });
});

/**
 * API TO INSERT DEVICE HISTORY PER DAY
 */
router.get('/insertDeviceHistory', function(req, res, next) {
    console.log("/insertDeviceHistory");

    var histdata = [];
    for(var i = 365; i >=7; i--){
        var date = moment(moment().subtract(i, 'days').calendar(),

                "MM/DD/YYYY HH:mm").unix()*1000;
        var energy_used = Math.ceil(Math.random()*500);
        var device_id = Math.floor((Math.random()*11)+1);
        histdata.push({"energy_date" : date,"energy_consumed" :energy_used,"device_id" : device_id});
    }

    devHistory.insertMany(histdata, function(err, docs){
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send("success");
        }
    });
});

router.get('/getAllDeviceHistory', function(req, res, next) {
    console.log("/getAllDeviceHistory");
    devHistory.find().sort({'energy_date': 1}).find(function (err, document){
        if(err){
            console.log(err);
            throw err;
        }
        res.send(document);
    });
});

/**
 * API TO INSERT UTILITY CONSUMPTION PER MONTH
 */
router.get('/insertUtilities', function(req, res, next) {
	console.log("/insertUtilities");

	var data = [];
	var month = ["January", "February", "March", "April"];
	var len = month.length;
	for(var i = 0; i < len; i++){
		var utility_month = month[i];
		var water_usage = Math.ceil(Math.random()*100);
		var gas_usage = Math.ceil(Math.random()*100);
		var electricity_usage = Math.ceil(Math.random()*100);
		data.push({"utility_month" : utility_month,"water_usage" :	water_usage,"gas_usage" : gas_usage,"electricity_usage" : electricity_usage});
	}

	utilityConsumed.insertMany(data, function(err, docs){
		if (err) {
			console.log(err);
			res.send("error");
		} else {
			res.send("success");
		}
	});
});

/**
 * API TO GET UTILITY CONSUMPTION PER MONTH
 */
router.get('/getAllUtilityConsumption', function(req, res, next) {
	console.log("/getAllUtilityConsumption");	
	utilityConsumed.find({}, function (err, document){
		if(err){
			console.log(err);
			throw err;
		}
		res.send(document);
	});
});

module.exports = router;