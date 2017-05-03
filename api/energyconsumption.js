var express = require('express');
var router = express.Router();
var energyModel = require('../schema/consumptionModel');
var deviceModel = require('../schema/deviceModel');


router.post('/insertDevice', function(req, res, next) {
	console.log("/insertDevice");
	
	var deviceInstance = new deviceModel({
		device_name: req.body.device_name,
		device_loc: req.body.device_loc
	});
	
	deviceInstance.save(function (err) {
		if (err) {
			res.send("error");
		} else {
			res.send("success");
		}
	});	
});


router.post('/insertEnergyUtil', function(req, res, next) {
	console.log("/insertEnergyUtil");
	deviceModel.findOne({ device_id: req.body.device_id}, function (err, document){
		if(err){
			console.log(err);
			throw err;
			res.send("error");	
		}
		var energyInstance = new energyModel({
			device_id: document._id,
			energy_date: req.body.energy_date,
			energy_consumed: Math.ceil(Math.random()*1000)
		});

		energyInstance.save(function (err) {
			if (err) {
				console.log(err);
				res.send("error");
			} else {
				res.send("success");
			}
		});
	});			
});

router.post('/insertDummyEnergyData', function(req, res, next) {
	console.log("Routed to /insertDummyEnergyData");
	var from_date = new Date(req.body.from_date);
	var to_date = new Date(req.body.to_date);

	deviceModel.findOne({ device_id: req.body.device_id}, function (err, document) {
		if(err){ 
			console.log(err);
			res.send("error");	
		}
		console.log("Got id from device table for insertion");

		for (var energy_date_temp = new Date(from_date); energy_date_temp <= to_date; energy_date_temp.setDate(energy_date_temp.getDate() + 1)) {
			console.log("Date: " + energy_date_temp);
			var temp = energy_date_temp + ""
			var energyInstance = new energyModel({
				device_id: document._id,
				energy_date: temp,
				energy_consumed: Math.ceil(Math.random()*1000)
			});

			energyInstance.save(function (err) {
				if (err) {
					console.log(err);
					res.send("error");
				} else {
					console.log("Inserted for date " + energyInstance.energy_date);
				}
			});			

		}
	});			
});

router.post('/getAllDeviceConsumptionForWeek', function(req, res, next) {

	energyModel.find({
		"energy_date": {"$gte": req.body.from_date, "$lte": req.body.to_date}
	  })
     .populate('device_id')
     .exec(function(err, document){
    	   if (err) {
    	 	  console.log(err);
    	 	  throw err;    		 
    	   }
    	   if (document.length > 0) {
				console.log(document);
          		console.log(document[0].device_id.device_name);    	   	
    	   }
          res.send(document);
     })
});

router.get('/getDeviceConsumption', function(req, res, next) {
	console.log("/getDeviceConsumption");	
	energyModel.find({
		"device_id": req.body.device_id
	  })
     .populate('device_id')
     .exec(function(err, document){
    	   if (err) {
    	 	  console.log(err);
    	 	  throw err;    		 
    	   }
          console.log(document);
          console.log(document[0].device_id.device_name);
          res.send(document);
     })
});

module.exports = router;
