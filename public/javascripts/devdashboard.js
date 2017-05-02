/**
 * Created by Vish on 5/1/2017.
 */
$(document).ready(function(){
    $('.modal').modal({
        dismissible:false
    });
    $('#modal1').modal('open');

    $.getJSON('/api/device/getAllDeviceHistory', function (data) {
        console.log(myDevId);
        var series = [];

        for (var i=0 ; i< data.length; i++) {
            if(myDevId===data[i].device_id){
                var dayUsed = new Date(data[i].energy_date);
                var date = moment(dayUsed, "MM/DD/YYYY HH:mm").unix()*1000;
                series.push([date,data[i].energy_consumed]);
            }
        }

        var chart = Highcharts.stockChart('highchart4', {

            chart: {
                height: 300
            },

            credits: {
                enabled: true
            },


            title: {
                text: hc4_title
            },

            yAxis: {
                title: {
                    text: 'KWatts'
                }
            },

            rangeSelector: {
                selected: 1
            },

            series: [{
                name: hc4_subtitle,
                data: series,
                type: 'area',
                threshold: null,
                color:'#8cff66',
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