$(document).ready(function(){
    var devmap = new Map();

	$.ajax({
		type: 'POST',
		url: '/api/device/getAggregatedConsumption',
		dataType: 'json',                              
	})
	.done(function(result) {
        for (var i=0 ; i< result.length; i++) {
        	devmap.set(result[i]._id,result[i].energy_consumed);
		}
	})
	.fail(function(xhr, status, error) {
		console.log(error);
	});

	/**
	 * Populate Cards in Device Management Tab
	 */

	$.getJSON('/api/device/getUniqueDevices', function (data) {
		console.log(data);
		var series = [];
		var energy_data=0;
		for (var i=0 ; i< data.length; i++) {
			if(devmap.has(data[i]._id)){
				energy_data=devmap.get(data[i]._id);
			}
			else{
				energy_data=0;
			}
		    series.push({"joined_id":data[i]._id,"dev_id" : data[i].device_id, "name" : data[i].device_name,"lastused":data[i].device_util_startTime,"total_cons":energy_data,"img_path":data[i].device_img_path});
		}
        $.each(series, function (key, data) {
            //Loop to write all card element with json. (i is index for card in json.)
            console.log(data);

            $('.area').append('<div class="col s12 m6 l3" >'+'<div class="card"><div class="card-image waves-effect waves-block waves-light"><img class ="activator" src="'+ data.img_path+'" alt="Device Pic"></div>'+
                '<div class="card-content">'+'<span class="card-title activator grey-text text-darken-4">' + data.name + '<i class="material-icons right">more_vert</i></span>'+
                '<p><a class="waves-effect waves-light btn mybtn" href="/devdash?id='+data.joined_id+'">'+mydash+'</a></p>' +
                '</p></div>'+'<div class="card-reveal"><span class="card-title grey-text text-darken-4">ID: ' + data.dev_id+ '<i class="material-icons right">close</i></span><p>'+
				lastused+': '+data.lastused+'</p><br><p>'+ totalcons+': '+data.total_cons+'</p></div></div></div>');
        });
	});
});
