var express = require('express');
var router = express.Router();
var energyModel = require('../schema/consumptionModel');
var deviceModel = require('../schema/deviceModel');


router.post('/insertDevice', function(req, res, next) {
	console.log("/insertDevice");
	
	var deviceInstance = new deviceModel({
		device_name: req.body.device_name,
		device_loc: req.body.device_loc;
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
			device_util_date: req.body.device_util_date,
			device_energy_consumption: Math.ceil(Math.random()*1000)
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

router.post('/getAllDeviceConsumptionForWeek', function(req, res, next) {

	energyModel.find({
		"device_util_date": {"$gte": req.body.from_date, "$lte": req.body.to_date}
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

router.get('/getDeviceConsumption', function(req, res, next) {
	console.log("/getDeviceConsumption");	
	deviceModel.findOne({ device_id: req.body.device_id}, function (err, document){
		if(err){
			console.log(err);
			throw err;
		}
		res.send(document);
	});
});

module.exports = router;
