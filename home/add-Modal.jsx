import * as React from "react";
import {Bar, Line} from "react-chartjs";
import ReactHighcharts from "react-highcharts/ReactHighcharts";
import {Col, Row} from "react-bootstrap";
import * as Highcharts from "react-dom";

class AddModal extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            plot:[]
        };
        fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("FB","MSFT","AAPL","AMZN")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
            .then((data)=> {
                return data.json()
            })
            .then((data) => {
                 this.setState({data:data.query.results.quote});
            });
    }
    render() {
        var seriesOptions = [];
        var categories = ['EPSEstimateCurrentYear','EPSEstimateNextYear','EPSEstimateNextQuarter','BookValue'];
        this.state.data.map(data => {
            seriesOptions.push({name:data.Name,data:[+data.EPSEstimateCurrentYear,+data.EPSEstimateNextYear,+data.EPSEstimateNextQuarter,+data.BookValue]});
        });

        const data = {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
            ],
            datasets: [
                {
                    borderWidth:1.0,
                    categoryPercentage:1.0,
                    barPercentage:1.0,
                },
                {
                    label: "My First dataset",
                    fillColor: "rgba(204,255,255,0.2)",
                    borderColor:"rgb(204,255,255)",
                    allowTransparency:true,
                    data: [
                        90,
                        70,
                        80,
                        120,
                        150
                    ],
                   fill:false,
                }, {
                    label: "My Second dataset",
                    fillColor: "rgba(224, 224, 224, 0.1)",
                    allowTransparency:true,
                    borderColor:"rgb(224,224,224)",
                    fill:false,
                    data: [
                        73,
                        59,
                        300,
                        60,
                        54,
                    ]
                }
            ]
        }
        const options = {
            maintainAspectRatio: false,
            scaleShowVerticalLines: false,
            scaleShowHorizontalLines:false,
            stepSize:50,
            responsive: false,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'label'
            },
            hover: {
                mode: 'dataset'
            },
            scale: {
                ticks: {
                    max: 500,
                    min: 0,
                    stepSize: 10,
                    maxTicksLimit:10
                }
            },
            scales: {
                xAxes: [
                    {
                        categoryPercentage: 1.0,
                        barPercentage: 1.0,
                        display: true,
                        stacked: true,
                        scaleLabel: {
                            show: true,
                            labelString: 'Month'
                        },

                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            show: true,
                            labelString: 'Value'
                        },
                        stacked: true
                    }
                ]
            }
        }
     /*   var config = {

            plotOptions: {
                series: {
                   /!* stacking: 'normal'*!/
                   animation:false,
                    allowPointSelect:true
                }
            },
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 25
            },
            exporting: {
                enabled: true
            },
            colors: ['rgba(95,158,160,1.2)','rgba(107,33,76,1.2)', 'rgba(135,197,245,1.2)','yellow'],
            chart: {
                type:'line',
                zoomType: 'x',
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            xAxis: {
                categories: categories
            },
            /!*series: [
                {
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                },
                {
                    data: [39.9, 171.5, 96.4, 29.2, 44.0, 76.0, 335.6, 84.5, 116.4, 94.1, 205.6, 354.4]
                }
            ],*!/
          /!*  series: seriesOptions,*!/
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }
        };*/
    var config = {

        chart: {
            type: 'area',
            zoomType: 'x',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            setOptions:{
                global: {
                    useUTC: false
                }
            },

            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        console.log(new Date().getTime());
                        var plot=[new Date().getTime(),Math.random()];
                         //this.setState({plot:[new Date().getTime(),Math.random()]}); // current time
                       series.addPoint(plot, true, true);
                    }, 5000);
                }
            }
        },
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },
        title: {
            text: 'Live random data'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
       /* tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },*/
        legend: {
            enabled: true
        },
        exporting: {
            enabled: true
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                         Math.random()
                    ]);
                }
                return data;
            }())
        }]
    }

        return (
        <div className="content-area">
            <Row>
                <Col xs={6}>
                    <div className="card">
                        <ReactHighcharts  config={config} ></ReactHighcharts>
                    </div>
                </Col>
            </Row>
        </div>
        );
    }
}
export default AddModal;


