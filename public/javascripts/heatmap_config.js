$(document).ready(function(){

    var MON = 0;
    var TUE = 1;
    var WED = 2;
    var THUS = 3;
    var FRI = 4;
    var SAT = 5;
    var SUN = 6;

    var from_date = "2017-04-24T11:00:03.454Z";
    var to_date = "2017-04-30T11:00:03.454Z";
    var map = new Map();
    $('.collapsible').collapsible();

        $.ajax({
            type: 'POST',
            url: '/api/energy/getAllDeviceConsumptionForWeek',
            data: { "from_date": from_date,
                    "to_date": to_date},
            dataType: 'json',                              
        }).done(function(result) {
            console.log("RESULT");
            //result in json format here
            for (var i = 0; i < result.length; i++) {
                var device_name = result[i].device_id.device_name;
                var util_date = result[i].device_id.device_util_date;
                var energy = result[i].device_id.device_energy_consumption;

                if (map.get(device_name) != null) {
                    var energy_per_day = map.get(device_name);
                    if (energy_per_day.get(getDay(util_date)) == null) {
                        energy_per_day = new Map();
                    } 
                    energy_per_day.put(getDay(util_date), energy);
                } else {
                    var energy_per_day = new Map();
                    energy_per_day.put(getDay(util_date), energy);
                    map.put(device_name, energy_per_day);
                }    
            }
            var devices = [];
            var series = [];
            
            for (var i = 0; i < map.length, i++) {
                devices.push(map[i].key);
                var energy_util = map[i].value;
                for (var j = 0; j < energy_util.length; j++) {
                    series.push([i, energy_util[j].key, energy_util[j].value]);
                }                
            }    


            //populate highcharts from this data,

        }).fail(function(xhr, status, error) {
            console.log(error);
        });


    /**
     * Highchart for displaying devices used
     */

        $.getJSON('/api/energy/getAllDeviceConsumptionForWeek', function (data) {
            console.log(data);
            var series = [
               [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67],
               [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48],
               [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52],
               [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16],
               [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115]
              ];

        var devices = [];
        //get all devices, get amount 

        for (var i=0 ; i< data.length; i++) {
            devices.push(data[i].device_id.device_name);
        }

        
        Highcharts.chart('highchart1', {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },
            title: {
                text: 'Electricity Usage per weekday'
            },
            tooltip: {
               formatter: function () {
                    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> consumed <br><b>' +
                    this.point.value + '</b> units on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
               }
            },
            xAxis : {
                categories: devices
            },
            yAxis : {
                categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                title: null
            }, 
            colorAxis : {
               min: 0,
               minColor: '#FFFFFF',
               maxColor: Highcharts.getOptions().colors[0]
            },
            legend : {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            series: [{
                name: 'Sales per employee',
                borderWidth: 1,
                data: series,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]
        });
    });
});
