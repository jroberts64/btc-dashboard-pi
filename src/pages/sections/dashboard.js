import React, { useState, useEffect } from "react"
import { MDBRow, MDBCol } from "mdbreact"
import LineChart from "../../components/lineChart.js"
import Card, { CardLong } from "./cards.js"
import getDateTime from "../../lib/dateTime.js"
import MyClock from "../../components/clock.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"

const Dashboard = () => {
  const [price, setPrice] = useState(0)
  const [blocksToNextHalving, setBlocksToNextHalving] = useState(0)
  const [timer, setTimer] = useState(0)
  const lostBitcoins = 1000000
  const [height, setHeight] = useState(0)

  function convertBlocksToMinutes(blocks) {
    // blocks take 10 minutes to mine on average
    return blocks * 10
  }

  function estimatedDayOfNextHalving(blockHeight) {
    return new Date(Date.now() + convertBlocksToMinutes(blockHeight)*60000)
  }

  function timeToHalving(blockHeight) {
    const totalMinutesToHalving = Number(blockHeight+1) * 10 // mine 10 minutes per block
    const minutesInADay = 24 * 60
    const daysToHalving = Math.floor(totalMinutesToHalving / minutesInADay)
    const hoursToHalving = Math.floor(
      (totalMinutesToHalving - daysToHalving * minutesInADay) / 60
    )
    const minutesToHalving = totalMinutesToHalving - daysToHalving
      * minutesInADay - hoursToHalving * 60
    return (
      daysToHalving + " days "
      + hoursToHalving + " hrs "
      + minutesToHalving + " mins"
    )
  }

  function fmtNumber(num, decimals = 0) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    })
        .format(num)
  }
  function fmtCurrency(num, decimals = 0) {
    return "$" + new Intl.NumberFormat("en-US", 
      { maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
       })
      .format(num)
  }
  function getStock2Flow(blockHeight) {
    var reward = 50
    const halvings = Math.floor(blockHeight / 210000)
    var stock = 0

    for(var i = 0; i< halvings; i++) {
      stock += 210000 * reward
      reward = reward / 2
    }

    stock += blockHeight % 210000 * reward
    return (stock - lostBitcoins) / (reward * 6 * 24 * 365)
  }

  function getStock2FlowPrice(s2f) {
    //  Model price (USD) = exp(-1,84) * SF ^ 3,36
    return Math.exp(-1.84) * Math.pow(s2f,3.36)
  }

  function loadData() {
    if (typeof window !== `undefined`) {
      fetch("https://blockchain.info/ticker", {cache: "no-cache"})
        .then(res => res.json())
        .then(json => {
          setPrice(json.USD.last)
        })
        .catch(err => {
          console.log(err)
        })
        fetch("https://blockchain.info/q/getblockcount", {cache: "no-cache"})
          .then(res => res.json())
          .then(json => {
            setHeight(json)
            setBlocksToNextHalving(210000 - (json % 210000))
          })
          .catch(err => {
            console.log(err)
          })
        
    }
  }

  useEffect( () => {
      if (typeof window !== `undefined`) {
        const id = window.setTimeout(() => {
          loadData();
          timer ? setTimer(-timer) : setTimer(300000) 
        }, Math.abs(timer));
          return () => {
          window.clearTimeout(id);
        };
      }
    },[timer]
  );

  return (
    <div>
      <MDBRow className="mb-4">
        <CardLong desc="Last Updated" value={getDateTime()} />
        <CardLong
          desc={"Next Halving " 
            + getDateTime(estimatedDayOfNextHalving(blocksToNextHalving))
            + " In..."}
          value={timeToHalving(blocksToNextHalving)}
        />
      </MDBRow>
      <MDBRow className="mb-4">
        <Card
          desc="BTC Price USD"
          value={fmtCurrency(price,2)}
          icon="money-bill-wave"
          class="green accent-5"
        />
        <Card
          desc="Current Stock 2 Flow"
          value={fmtNumber(getStock2Flow(height),4)}
          icon="fill-drip"
          class="yellow accent-5"
        />
        <Card
          desc="Stock 2 Flow Price"
          value={fmtCurrency(getStock2FlowPrice(getStock2Flow(height)),2)}
          icon="chart-line"
          class="red accent-5"
        />
        <Card
          desc="Blocks to Next Halving"
          value={fmtNumber(blocksToNextHalving)}
          icon="hourglass-half"
          class="blue accent-5"
        />
      </MDBRow>
      <MDBRow className="mb-4" style={{ marginTop: "-10px" }}>
      <MDBCol xl="6" md="6" className="mb-r">
          <LineChart 
            url="https://api.blockchain.info/charts/market-price?timespan=180days&format=json&cors=true"
            chartTitle="Bitcoin Price"
          />
        </MDBCol>
        <MDBCol xl="6" md="6" className="mb-r">
        <LineChart 
          url="https://api.blockchain.info/charts/trade-volume?timespan=180days&format=json&cors=true"
          chartTitle="Exchange Volume ($M)"
          valueScale="1000000"
        />
        </MDBCol>
      </MDBRow>
      <MDBRow style={{ marginTop: "-10px", fontSize: "100%", textAlign: "right"}}>
        <MDBCol xl="12" md="12" className="mb-r">
          <MyClock />
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Dashboard
