import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const LineChart: React.FC = () => {
    useEffect(()=>{
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_dark);
        // Themes end
        // Create chart instance
        var chart = am4core.create("lineDiv", am4charts.XYChart);
        // var data= [{
        // "date": 1.0,
        // "value": 13
        // },{
        // "date": 1.5,
        // "value": 13
        // },{
        // "date": 2.0,
        // "value": 13
        // },{
        // "date": 2.5,
        // "value": 13
        // },{
        // "date": 3.0,
        // "value": 13
        // },{
        // "date": 3.5,
        // "value": 13
        // },{
        // "date": 4.0,
        // "value": 13
        // },{
        // "date": 4.5,
        // "value": 13
        // },{
        // "date": 5.0,
        // "value": 13
        // },{
        // "date": 5.5,
        // "value": 13
        // }];
        // // Add data
        chart.data = data;
        // Set input format for the dates
        // Create axes
        var valueAxis1 = chart.xAxes.push(new am4charts.ValueAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.valueX = "date";
        series.tooltipText = "{value}"
        series.strokeWidth = 2;
        series.minBulletDistance = 15;
        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";
        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");
        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = valueAxis1;
        chart.cursor.snapToSeries = series;
        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();
        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        valueAxis1.start = 0.79;
        valueAxis1.keepSelection = true; 

        return () => {
            chart.dispose();
        }
    }, [])
    return (
        <div style={{ maxWidth: '90vw', overflowX: 'auto' }}>
            <div style={{ width: '600px', height: '400px' }} id="lineDiv" />
        </div>
    )
}

const PieChart: React.FC = () => {
    useEffect(()=>{
        // Themes begin
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_dark);
        // Themes end
  
        let container = am4core.create("pieDiv", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";
  
  
        let chart = container.createChild(am4charts.PieChart);
  
        // Add data
        // chart.data = [{
        // "country": "Lithuania",
        // "litres": 500,
        // "subData": [{ name: "A", value: 200 }, { name: "B", value: 150 }, { name: "C", value: 100 }, { name: "D", value: 50 }]
        // }, {
        // "country": "Czech Republic",
        // "litres": 300,
        // "subData": [{ name: "A", value: 150 }, { name: "B", value: 100 }, { name: "C", value: 50 }]
        // }, {
        // "country": "Ireland",
        // "litres": 200,
        // "subData": [{ name: "A", value: 110 }, { name: "B", value: 60 }, { name: "C", value: 30 }]
        // }, {
        // "country": "Germany",
        // "litres": 150,
        // "subData": [{ name: "A", value: 80 }, { name: "B", value: 40 }, { name: "C", value: 30 }]
        // }, {
        // "country": "Australia",
        // "litres": 140,
        // "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
        // }, {
        // "country": "Austria",
        // "litres": 120,
        // "subData": [{ name: "A", value: 60 }, { name: "B", value: 30 }, { name: "C", value: 30 }]
        // }];
        chart.data = pie_data;
        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "Number of People";
        pieSeries.dataFields.category = "frame_sec";
        pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
        //pieSeries.labels.template.text = "{category}\n{value.percent.formatNumber('#.#')}%";
  
        pieSeries.slices.template.events.on("hit", function(event) {
        selectSlice(event.target.dataItem);
        })
  
        let chart2 = container.createChild(am4charts.PieChart);
        chart2.width = am4core.percent(30);
        chart2.radius = am4core.percent(80);
  
        // Add and configure Series
        let pieSeries2 = chart2.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = "count";
        pieSeries2.dataFields.category = "labels";
        pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
        //pieSeries2.labels.template.radius = am4core.percent(50);
        //pieSeries2.labels.template.inside = true;
        //pieSeries2.labels.template.fill = am4core.color("#ffffff");
        pieSeries2.labels.template.disabled = true;
        pieSeries2.ticks.template.disabled = true;
        pieSeries2.alignLabels = false;
        pieSeries2.events.on("positionchanged", updateLines);
  
        let interfaceColors = new am4core.InterfaceColorSet();
  
        let line1 = container.createChild(am4core.Line);
        line1.strokeDasharray = "2,2";
        line1.strokeOpacity = 0.5;
        line1.stroke = interfaceColors.getFor("alternativeBackground");
        line1.isMeasured = false;
  
        let line2 = container.createChild(am4core.Line);
        line2.strokeDasharray = "2,2";
        line2.strokeOpacity = 0.5;
        line2.stroke = interfaceColors.getFor("alternativeBackground");
        line2.isMeasured = false;
  
        let selectedSlice;
  
        function selectSlice(dataItem) {
  
        selectedSlice = dataItem.slice;
  
        let fill = selectedSlice.fill;
  
        let count = dataItem.dataContext.subData.length;
        pieSeries2.colors.list = [];
        for (var i = 0; i < count; i++) {
            pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
        }
  
        chart2.data = dataItem.dataContext.subData;
        pieSeries2.appear();
  
        let middleAngle = selectedSlice.middleAngle;
        let firstAngle = pieSeries.slices.getIndex(0).startAngle;
        let animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
        animation.events.on("animationprogress", updateLines);
  
        selectedSlice.events.on("transformed", updateLines);
  
        //  var animation = chart2.animate({property:"dx", from:-container.pixelWidth / 2, to:0}, 2000, am4core.ease.elasticOut)
        //  animation.events.on("animationprogress", updateLines)
        }
  
  
        function updateLines() {
        if (selectedSlice) {
            let p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
            let p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };
  
            p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
            p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);
  
            let p21 = { x: 0, y: -pieSeries2.pixelRadius };
            let p22 = { x: 0, y: pieSeries2.pixelRadius };
  
            p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
            p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);
  
            line1.x1 = p11.x;
            line1.x2 = p21.x;
            line1.y1 = p11.y;
            line1.y2 = p21.y;
  
            line2.x1 = p12.x;
            line2.x2 = p22.x;
            line2.y1 = p12.y;
            line2.y2 = p22.y;
        }
        }
  
        chart.events.on("datavalidated", function() {
        setTimeout(function() {
            selectSlice(pieSeries.dataItems.getIndex(0));
        }, 1000);
        })
        return () => {
          chart.dispose();
        }
  
    },[])
    return (
        <div style={{ maxWidth: '90vw', overflowX: 'auto' }}>
            <div style={{ width: '600px', height: '400px' }} id="pieDiv" />
        </div>
    )
}


const FlowerChart: React.FC = () => {
    useEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create("flowerDiv", am4charts.RadarChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        // chart.data = [
        // {
        //     category: "One",
        //     value1: 8,
        //     value2: 2
        // },
        // {
        //     category: "Two",
        //     value1: 11,
        //     value2: 4
        // },
        // {
        //     category: "Three",
        //     value1: 7,
        //     value2: 6
        // },
        // {
        //     category: "Four",
        //     value1: 13,
        //     value2: 8
        // },
        // {
        //     category: "Five",
        //     value1: 12,
        //     value2: 10
        // },
        // {
        //     category: "Six",
        //     value1: 15,
        //     value2: 12
        // },
        // {
        //     category: "Seven",
        //     value1: 9,
        //     value2: 14
        // },
        // {
        //     category: "Eight",
        //     value1: 6,
        //     value2: 16
        // }
        // ];
        chart.data = flower_data;

        chart.padding(20, 20, 20, 20);

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;
        categoryAxis.renderer.cellStartLocation = 0.2;
        categoryAxis.renderer.cellEndLocation = 0.8;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = 0;

        let series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.tooltipText = "{name}: {valueY.value}";
        series1.columns.template.width = am4core.percent(100);
        series1.name = "Series 1";
        series1.dataFields.categoryX = "category";
        series1.dataFields.valueY = "value1";

        let series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.columns.template.width = am4core.percent(100);
        series2.columns.template.tooltipText = "{name}: {valueY.value}";
        series2.name = "Series 2";
        series2.dataFields.categoryX = "category";
        series2.dataFields.valueY = "value2";


        chart.seriesContainer.zIndex = -1;

        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX.exportable = false;
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.exportable = false;

        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.fullWidthXLine = true;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fillOpacity = 0.1;
        chart.cursor.lineX.fill = am4core.color("#000000"); 

        return () => {
            chart.dispose();
        }
    }, [])

    return (
        <div style={{ maxWidth: '90vw', overflowX: 'auto' }}>
            <div style={{ width: '600px', height: '400px' }} id="flowerDiv" />
        </div>
    )
}


export {
    LineChart,
    PieChart,
    FlowerChart,

}
