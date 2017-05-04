$(document).ready(function(){

	$.getJSON('/api/device/getAllDevices',function(data){

		var series = [];

		for (var i=0 ; i< data.length; i++) {
			var startDateTime = new Date(data[i].device_util_startTime);
			var endDateTime = new Date(data[i].device_util_endTime);
			var arr = [data[i].device_name,moment(startDateTime).format("MM/DD/YYYY HH:mm"),
			           moment(endDateTime).format("MM/DD/YYYY HH:mm"),data[i].device_energy_consumption];
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
