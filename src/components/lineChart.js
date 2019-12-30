import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"

const LineChart = props => {
  const [chartData, setChartData] = useState([])
  const [timer, setTimer] = useState(0)

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
    var str = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear()
    return ['Jan','Feb','Mar','Arp','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()] + " " + d.getDate()
  }

  function extractChartValues(currentValue) {
    return currentValue.y
  }

  function loadChartDataFromUrl() {
    if (typeof window !== `undefined`) {
      fetch( props.url)
        .then(res => res.json())
        .then(json => {
          graphLabels = json.values.map(extractChartLabels)
          graphValues = json.values.map(extractChartValues)
          setChartData(setupChartData(graphLabels,graphValues))
        })
        .catch(err => {
          console.log(err)   
        })
        
    }
  }

  useEffect( () => {
    console.log("priceChart timer = " + timer)
    if (typeof window !== `undefined`) {
      const id = window.setTimeout(() => {
        loadChartDataFromUrl();
        timer ? setTimer(-timer) : setTimer(300000) 
      }, Math.abs(timer));
      return () => {
        window.clearTimeout(id);
      };
    }
  },[timer]);

  return (
    <div>
      <Line data={chartData} />
    </div>
  )
}
export default LineChart
