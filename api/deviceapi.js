var express = require('express');
var router = express.Router();
var device = require('../schema/deviceModel');

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

module.exports = router;