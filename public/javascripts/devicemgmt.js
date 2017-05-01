$(document).ready(function(){

	$.ajax({
		type: 'GET',
		url: '/api/device/getUniqueDevices',
		dataType: 'json',                              
	})
	.done(function(result) {
		console.log("RESULT");
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
		
		for (var i=0 ; i< data.length; i++) {
		    series.push({"dev_id" : data[i].device_id, "name" : data[i].device_name,"lastused":data[i].device_util_startTime,"total_cons":data[i].device_energy_consumption,"img_path":data[i].device_img_path});
		}
        $.each(series, function (key, data) {
            //Loop to write all card element with json. (i is index for card in json.)
            console.log(data);

            $('.area').append('<div class="col s12 m6 l3" >'+'<div class="card"><div class="card-image waves-effect waves-block waves-light"><img class ="activator" src="'+ data.img_path+'" alt="Device Pic"></div>'+
                '<div class="card-content">'+'<span class="card-title activator grey-text text-darken-4">' + data.name + '<i class="material-icons right">more_vert</i></span>'+
                '<p><a class="waves-effect waves-light btn" href="/devdash?id='+data.dev_id+'">Dashboard</a></p>' +
                '</p></div>'+'<div class="card-reveal"><span class="card-title grey-text text-darken-4">ID: ' + data.dev_id+ '<i class="material-icons right">close</i></span><p>Last Used: '
                +data.lastused+'</p><br><p>Total Consumption: '+data.total_cons+'</p></div></div></div>');
        });
	});

});
