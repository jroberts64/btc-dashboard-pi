import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"

const LineExample = props => {
  // const [labels, setLabels] = useState(null)
  // const [graphData, setGraphData] = useState(null)
  const [data, setData] = useState([])

  var labels = [];
  var graphData = [];

  function setupData(labels, graphData) {
    var data = {
      labels: labels,
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: "BTC Price (last 6 months)",
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
          //data: [65, 59, 80, 81, 56, 55, 40]
        },
      ],
    }
    return data;
  }
  
  function getXs(currentValue) {
    var d = new Date(currentValue.x*1000)
    var str = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear()
    return ['Jan','Feb','Mar','Arp','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()] + " " + d.getDate()
    return (d.getMonth()+1) + "/" + d.getDate() 
    return str;
    return d.toDateString()
  }

  function getYs(currentValue) {
    return currentValue.y
  }

  useEffect(() => {


    if (typeof window !== `undefined`) {
      fetch(
        "https://api.blockchain.info/charts/market-price?timespan=180days&format=json&cors=true"
      )
        .then(res => res.json())
        .then(json => {
          console.log("line graph" + json)
          labels = json.values.map(getXs)
          graphData = json.values.map(getYs)
          setData(setupData(labels,graphData))
        })
        .catch(err => {
          console.log(err)   
        })
        
    }
  }, [])

  return (
    <div>
      <Line data={data} />
    </div>
  )
}
export default LineExample
