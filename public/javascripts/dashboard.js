$(document).ready(function(){

	$('.collapsible').collapsible();

	$.ajax({
		type: 'GET',
		url: '/api/device/getAllDevices',
		dataType: 'json',                              
	})
	.done(function(result) {
		console.log("RESULT");
	})
	.fail(function(xhr, status, error) {
		console.log(error);
	});

	/**
	 * Highchart for displaying devices used
	 */

	$.getJSON('/api/device/getAllDevices', function (data) {
		
		var series = [];
		
		for (var i=0 ; i< data.length; i++) {
		    series.push({"name" : data[i].device_name, "y" : data[i].device_energy_consumption})
		}
		
		Highcharts.chart('highchart1', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Device Utilization Chart'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: 'Device',
				colorByPoint: true,
				data: series
			}]
		});

	});


	/**
	 * 
	 */
	Highcharts.chart('highchart2', {
		title: {
			text: 'Combination chart'
		},
		xAxis: {
			categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
		},
		labels: {
			items: [{
				html: 'Total fruit consumption',
				style: {
					left: '50px',
					top: '18px',
					color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
				}
			}]
		},
		series: [{
			type: 'column',
			name: 'Jane',
			data: [3, 2, 1, 3, 4]
		}, {
			type: 'column',
			name: 'John',
			data: [2, 3, 5, 7, 6]
		}, {
			type: 'column',
			name: 'Joe',
			data: [4, 3, 3, 9, 0]
		}, {
			type: 'spline',
			name: 'Average',
			data: [3, 2.67, 3, 6.33, 3.33],
			marker: {
				lineWidth: 2,
				lineColor: Highcharts.getOptions().colors[3],
				fillColor: 'white'
			}
		}, {
			type: 'pie',
			name: 'Total consumption',
			data: [{
				name: 'Jane',
				y: 13,
				color: Highcharts.getOptions().colors[0] // Jane's color
			}, {
				name: 'John',
				y: 23,
				color: Highcharts.getOptions().colors[1] // John's color
			}, {
				name: 'Joe',
				y: 19,
				color: Highcharts.getOptions().colors[2] // Joe's color
			}],
			center: [100, 80],
			size: 100,
			showInLegend: false,
			dataLabels: {
				enabled: false
			}
		}]
	});





	/**
	 * Highchart for displaying timeline view of energy consumption
	 */

	$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {

		// Create the chart
		var chart = Highcharts.stockChart('highchart3', {

			chart: {
				height: 400
			},

			title: {
				text: 'Energy consumption timeline'
			},

			subtitle: {
				text: 'Click small/large buttons or change window size to test responsiveness'
			},

			rangeSelector: {
				selected: 1
			},

			series: [{
				name: 'AAPL Stock Price',
				data: data,
				type: 'area',
				threshold: null,
				tooltip: {
					valueDecimals: 2
				}
			}],

			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						chart: {
							height: 300
						},
						subtitle: {
							text: null
						},
						navigator: {
							enabled: false
						}
					}
				}]
			}
		});

	});

});
