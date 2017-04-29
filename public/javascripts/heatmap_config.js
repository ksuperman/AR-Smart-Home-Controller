//load data
//jquery data requst from db
// var prevCount = 1;
// var nextCount = 1;
// var currDate = Date.today();



// var xAxisData = {
//         categories: ['Bulb', 'Fan', 'Refrigerator', 'Washing Machine', 'Toaster']
//     }; 

// var chartData = {
//         type: 'heatmap',
//         marginTop: 40,
//         marginBottom: 80,
//         plotBorderWidth: 1
//     };

// var titleData = {
//         text: 'Electricity Usage per weekday'
//     };


// var yAxisData = {
//         categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//         title: null
//       };

// var colorAxisData = {
//         min: 0,
//         minColor: '#FFFFFF',
//         maxColor: Highcharts.getOptions().colors[0]
//     };

// var legendData = {
//         align: 'right',
//         layout: 'vertical',
//         margin: 0,
//         verticalAlign: 'top',
//         y: 25,
//         symbolHeight: 280
//     };

// var tooltipData = {
//         formatter: function () {
//             return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
//                 this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
//         }
//     };


// //HTTP request for getting all enegery consumption for a day, pass date range to query, get engery consumption by index for 7 days
// var seriesData = {
//         name: 'Sales per employee',
//         borderWidth: 1,
//         data: [
//                [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67],
//                [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48],
//                [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52],
//                [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16],
//                [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115]
//             ]
//         ,
//         dataLabels: {
//             enabled: true,
//             color: '#000000'
//         }
//     };    


// Highcharts.chart('container', {
//     chart: chartData,
//     title: titleData,
//     xAxis: xAxisData,
//     yAxis: yAxisData,
//     colorAxis: colorAxisData,
//     legend: legendData,
//     tooltip: tooltipData,
//     series: [seriesData]
// });


// function getThisMonday(d) {
//   d = new Date(d);
//   var day = d.getDay(),
//   diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  
//   return new Date(d.setDate(diff));
// }


// function loadPrev() {
//         currDate = currDate.last();
//         document.getElementById("from").innerHTML = currDate.monday();
//         document.getElementById("to").innerHTML = currDate.friday();
// }

// function loadNext() {
//         currDate = currDate.next();
//         document.getElementById("from").innerHTML = currDate.monday();
//         document.getElementById("to").innerHTML = currDate.friday();
// }



$(document).ready(function(){

    $('.collapsible').collapsible();

    $.ajax({
        type: 'GET',
        url: '/api/device/getAllDevices',
        dataType: 'json',                              
    }).done(function(result) {
        console.log("RESULT");
    }).fail(function(xhr, status, error) {
        console.log(error);
    });

    var MON = 0;
    var TUE = 1;
    var WED = 2;
    var THUS = 3;
    var FRI = 4;
    var SAT = 5;
    var SUN = 6;

    /**
     * Highchart for displaying devices used
     */
    $.getJSON('/api/device/getAllDevices', function (data) {

        $.ajax({
            type: 'POST',
            url: '/api/energy/getDeviceConsumption',
            data: 
            dataType: 'json',                              
        }).done(function(result) {
            console.log("RESULT");
        }).fail(function(xhr, status, error) {
            console.log(error);
        });

        $.ajax({
            url : "AJAX_POST_URL",
            type: ="POST",
            data : { device_id : data.},
            success: function(data, textStatus, jqXHR) {
                    //data - response from server
            },
            error: function (jqXHR, textStatus, errorThrown) {
 
            }
        });
        $.getJSON('/api/energy/getDeviceConsumption', function (consumption) {
            var series = [
               [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67],
               [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48],
               [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52],
               [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16],
               [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115]
              ];
        var devices = [];
        
        for (var i=0 ; i< data.length; i++) {
            devices.push(data[i].device_name);
        }

        for (var i=0 ; i< data.length; i++) {
            var monElec = 0;
            var tueElec = 0;
            var wedElec = 0;
            var thusElec = 0;
            var friElec = 0;

            for (var date = data[i].device_util_startTime; date < ) {
                if (getDay(date) == MON) {
                    monElec
                } else if () {

                } else if () {
                    
                }
                series.push([i, 0, data[i].device_energy_consumption])             
            }   

            series.push([i, 0, mon);         
            series.push([i, 1, tue);         
            series.push([i, 2, wed);         
            series.push([i, 3, thus);         
            series.push([i, 4, fri);         
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



});
