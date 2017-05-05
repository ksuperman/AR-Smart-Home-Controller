$(document).ready(function(){

	var for_date = moment().format('YYYY-MM-DD');
	
	$.getJSON('/api/device/getAllUniqueDevicesPerDay',function(data){

		console.log("DATATABLE:: "+data);
		
		var series = [];

		for (var i=0 ; i< data.length; i++) {
			var startDateTime = new Date(data[i].device_util_startTime);
			var endDateTime = new Date(data[i].device_util_endTime);
			var arr = [data[i].device_id.device_name,moment(startDateTime).format("MM/DD/YYYY HH:mm"),
			           moment(endDateTime).format("MM/DD/YYYY HH:mm"),data[i].energy_consumed];
			
			series.push(arr);
		}

		$('#datatable').DataTable({
			data: series,
			columns: [
			          { title: device },
			          { title: startTime },
			          { title: endTime },
			          { title: energyConsumption }
			          ]	
		});

	});

});
