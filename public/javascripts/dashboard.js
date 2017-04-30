$(document).ready(function(){

    /**
     * Highchart for displaying devices used
     */

    $.getJSON('/api/device/getAllDevices', function (data) {

        var series = [];

        for (var i=0 ; i< data.length; i++) {
            var x =new Date(data[i].device_util_startTime);
            var y =new Date(data[i].device_util_endTime);
            if(i==0){
                series.push({"name" : data[i].device_name, "y" : data[i].device_energy_consumption,
                    sliced: true, selected: true});
            }else{
                series.push({"name" : data[i].device_name, "y" : data[i].device_energy_consumption});
            }
        }

        Highcharts.chart('highchart1', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: hc1_title
            },
            tooltip: {
                pointFormat: '{series.name}: <b> {point.percentage:.1f}%</b>'
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
                name: hc1_subtitle,
                colorByPoint: true,
                data: series
            }]
        });

    });

    /**
     * Highchart for displaying monthly usage of utilities
     */
    $.getJSON('/api/device/getAllUtilityConsumption', function (data) {

        var months = [];
        var waterUsage = [];
        var gasUsage = [];
        var electricityUsage = [];
        var avgUsage = [];

        for (var i=0 ; i< data.length; i++) {
            var waterUsg = data[i].water_usage;
            var gasUsg = data[i].gas_usage;
            var electrictyUsg = data[i].electricity_usage;
            var avg = (waterUsg+gasUsg+electrictyUsg)/3;
            console.log(data[i].utility_month);
            months.push(data[i].utility_month);
            waterUsage.push(waterUsg);
            gasUsage.push(gasUsg);
            electricityUsage.push(electrictyUsg);
            avgUsage.push(avg)
        }

        Highcharts.chart('highchart2', {
            title: {
                text: hc2_title
            },
            xAxis: {
                categories: months
            },
            labels: {
                items: [{
                    html: 'PG&E Usage',
                    style: {
                        left: '50px',
                        top: '15px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: water,
                data: waterUsage
            }, {
                type: 'column',
                name: gas,
                data: gasUsage
            }, {
                type: 'column',
                name: electricity,
                data: electricityUsage
            }, {
                type: 'spline',
                name: average,
                data: avgUsage,
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions

                    ().colors[3],
                    fillColor: 'white'
                }
            }
            ]
        });


    });


    /**
     * Highchart for displaying timeline view of energy consumption
     */
    $.getJSON('/api/device/getAllDevicesEnergy', function (data) {

        var series = [];

        $("#currentDate" ).text(moment().format('L'));
        $("#energyConsumed" ).text(data[data.length-

        1].energy_consumed);
        $("#timeUsed" ).text(data[data.length-1].time_usage);
        $("#devicesUsed" ).text(data[data.length-1].devices_used);

        for (var i=0 ; i< data.length; i++) {
            var startDateTime = new Date(data[i].energy_date);
            var date = moment(startDateTime, "MM/DD/YYYY HH:mm").unix()*1000;
            series.push([date,data[i].energy_consumed]);
        }

        var chart = Highcharts.stockChart('highchart3', {

            chart: {
                height: 400
            },

            title: {
                text: hc3_title
            },

            rangeSelector: {
                selected: 1
            },

            series: [{
                name: hc3_subtitle,
                data: series,
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