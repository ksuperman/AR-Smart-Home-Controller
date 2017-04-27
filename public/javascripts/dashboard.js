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
		    series.push({"dev_id" : data[i]._id.dev_id, "name" : data[i]._id.name,"lastused":data[i].lastused,"total_cons":data[i].total});
		}
        $.each(series, function (key, data) {
            //Loop to write all card element with json. (i is index for card in json.)
            console.log(data);
            $('.area').append('<div class="col s12 m6 l3" >'+'<div class="card"><div class="card-image waves-effect waves-block waves-light"><img class ="activator" src="/images/bulb1.jpg"></div>'+
                '<div class="card-content">'+'<span class="card-title activator grey-text text-darken-4">' + data.name + '<i class="material-icons right">more_vert</i></span>'+
                '<p><a href="#">Dashboard</a></p></div>'+'<div class="card-reveal"><span class="card-title grey-text text-darken-4">ID: ' + data.dev_id+ '<i class="material-icons right">close</i></span><p>Last Used: '+data.lastused+'</p><br><p>Total Consumption: '+data.total_cons+'</p></div></div></div>');
        });
	});
/*Pagination*/
    $('#pagination').materializePagination({
        align: 'center',
        lastPage:  3,
        firstPage:  1,
        urlParameter: 'page',
        useUrlParameter: true,
        onClickCallback: function(requestedPage){
            console.log('Requested page is '+ requestedPage);
        }
    });
});
