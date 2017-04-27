var express = require('express');
var router = express.Router();
var energyModel = require('../schema/consumptionModel');

router.post('/insertEnergyUtil', function(req, res, next) {
	console.log("/insertEnergyUtil");
		
	var energyInstance = new energyModel({
		device_id: req.body.device_id,
		device_util_date: req.body.device_util_date,
		device_util_startTime: req.body.device_util_startTime,
		device_util_endTime: req.body.device_util_endTime,
		device_energy_consumption: Math.ceil(Math.random()*1000)
	});
			
	energyInstance.save(function (err) {
		if (err) {
			res.send("error");
		} else {
			res.send("success");
		}
	});
	
});

router.get('/getDeviceConsumption', function(req, res, next) {
	console.log("/getDeviceConsumption");	
	energyModel.findOne({ device_id: req.body.device_id}, function (err, document){
		if(err){
			console.log(err);
			throw err;
		}
		res.send(document);
	});
});

module.exports = router;
