import React from "react"
import { Line } from "react-chartjs-2"

const LineChart = props => {

  var graphLabels = [];
  var graphValues = [];

  function setupChartData(labels, graphData) {
    var data = {
      labels: labels,
      datasets: [
        {
          label: props.chartTitle,
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: graphData,
        },
      ],
    }
    return data;
  }
  
  function extractChartLabels(currentValue) {
    var d = new Date(currentValue.x*1000)
    return ['Jan','Feb','Mar','Arp','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()] + " " + d.getDate()
  }

  function extractChartValues(currentValue) {
    return props.valueScale ? currentValue.y / props.valueScale : currentValue.y
  }

  graphLabels = props.chartDataAndLabels.map(extractChartLabels)
  graphValues = props.chartDataAndLabels.map(extractChartValues)
  console.log("refreshing line chart! ")

  return (
    <div>
      <Line data={setupChartData(graphLabels,graphValues)} />
    </div>
  )
}
export default LineChart
