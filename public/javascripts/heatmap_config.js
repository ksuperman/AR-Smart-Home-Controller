$(document).ready(function(){
    var map = new Map();
    var from_date = "2017-04-23T11:00:03.454Z";
    var to_date = "2017-04-29T11:00:03.454Z";

    var fdate = new Date(from_date);
    var tdate = new Date(to_date);

    $("#from").text((fdate.getMonth() + 1) + '/' + fdate.getDate() + '/' +  fdate.getFullYear());
    $("#to").text((tdate.getMonth() + 1) + '/' + tdate.getDate() + '/' +  tdate.getFullYear());

    $( "#btnPrev" ).click(function() {
        fdate.setDate(fdate.getDate() - fdate.getDay()-7);
        tdate.setDate(tdate.getDate() - tdate.getDay()-7);
        $("#from").text((fdate.getMonth() + 1) + '/' + fdate.getDate() + '/' +  fdate.getFullYear());
        $("#to").text((tdate.getMonth() + 1) + '/' + tdate.getDate() + '/' +  tdate.getFullYear());
        //TODO load previous week from current from and to date values
    });
    
    
    $( "#btnNext" ).click(function() {
        alert( "Handler for .click() called." );
        //TODO load next week from current from and to date values
    });


    loadHighChart1();
    function loadHighChart1() {
        map.clear();
        $('.collapsible').collapsible();
        $.ajax({
            type: 'POST',
            url: '/api/energy/getAllDeviceConsumptionForWeek',
            data: { "from_date": from_date,
                    "to_date": to_date},
            dataType: 'json',                              
        }).done(function(result) {
            console.log("RESULT");
            console.log(result);

            //result in json format here
            for (var i = 0; i < result.length; i++) {
                var device_name = result[i].device_id.device_name;
                var util_date = new Date(result[i].energy_date);
                var energy = result[i].energy_consumed;
                var energy_per_day;

                if (map.get(device_name) != null) {
                    energy_per_day = map.get(device_name);
                    if (energy_per_day.get(util_date.getDay()) === null) {
                        energy_per_day = new Map();
                    } 
                    energy_per_day.set(util_date.getDay(), energy);

                } else {
                    energy_per_day = new Map();
                    energy_per_day.set(util_date.getDay(), energy);
                    map.set(device_name, energy_per_day);
                }    
            }
            var devices = [];
            var series = [];
            
            map.forEach(function(value, key, map) {
              console.log('key: "' + key + '", value: "' + value + '"');
            });

            var count = 0;
            for (var entry of map.entries()) {
                console.dir(entry);
                console.log("key: " + entry[0])
                console.log("value: " + entry[1])                
                devices.push(entry[0]);                
                for (var entry_child of entry[1].entries()) {
                    var data = [count, entry_child[0], entry_child[1]];
                    series.push(data);
                }                
                count++;
            }

            console.log(devices);
            console.log(series);

            //populate highcharts from this data,
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
                    categories: ["Sunday", 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday"],
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

        }).fail(function(xhr, status, error) {
            console.log(error);
        });
    }
});
