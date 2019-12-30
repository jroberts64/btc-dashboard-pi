import React, { useState, useEffect } from "react"
import { MDBRow, MDBCol } from "mdbreact"

import LineChart from "../../components/lineChart.js"


import AdminCard, { AdminCardLong } from "./AdminCard.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"

const AdminCardSection1 = () => {
  const [price, setPrice] = useState(0)
  const [height, setHeight] = useState(0)
  const [tradeVol, setTradeVol] = useState(0)
  const [nextHalfBlocks, setNextHalfBlocks] = useState(0)
  const [trxVol, setTrxVol] = useState(0)
  const [timer, setTimer] = useState(0)

  function getDate() {
    const currentdate = new Date()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

     return months[currentdate.getMonth()]  + " "
      + currentdate.getDate() + ", "
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes()
  }

  function timeToHalving(blocks) {
    const totalMinutesToHalving = Number(blocks+1) * 10 // mine 10 minutes per block
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
      + minutesToHalving + "ish mins"
    )
  }

  function fmtNumber(num, decimals = 0) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals })
        .format(num)
  }
  function fmtCurrency(num, decimals = 0) {
    return "$" + new Intl.NumberFormat("en-US", 
      { maximumFractionDigits: decimals })
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
    return stock / (reward * 6 * 24 * 365)
  }

  function loadData() {
    if (typeof window !== `undefined`) {
      fetch("https://api.blockchain.info/stats")
        .then(res => res.json())
        .then(json => {
          setPrice(json.market_price_usd)
          setHeight(json.n_blocks_total)
          setTradeVol(json.trade_volume_usd / 1000000)
          setNextHalfBlocks(210000 - (Number(json.n_blocks_total) % 210000))
          setTrxVol(json.trade_volume_usd)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect( () => {
      console.log("AdminSection timer called " + timer)
      if (typeof window !== `undefined`) {
        const id = window.setTimeout(() => {
          loadData();
          timer ? setTimer(-timer) : setTimer(300000) 
        }, Math.abs(timer));
          return () => {
          //window.clearTimeout(id);
        };
      }
    },[timer]
  );

  return (
    <div>
      <MDBRow className="mb-4">
        <AdminCardLong desc="Last Updated" value={getDate()} />
        <AdminCardLong
          desc="Time to Next Halvening"
          value={timeToHalving(nextHalfBlocks)}
        />
      </MDBRow>
      <MDBRow className="mb-4">
        <AdminCard
          desc="BTC Price USD"
          value={fmtCurrency(price)}
          icon="money-bill-wave"
          class="green accent-5"
        />
        <AdminCard
          desc="Current Stock 2 Flow"
          value={fmtNumber(getStock2Flow(height),2)}
          icon="fill-drip"
          class="yellow accent-5"
        />
        <AdminCard
          desc="Blocks to Next Halvening"
          value={fmtNumber(nextHalfBlocks)}
          icon="hourglass-half"
          class="blue accent-5"
        />
        <AdminCard
          desc="24 hr Trading Volume"
          value={fmtCurrency(trxVol / 1000000) + "M"}
          icon="chart-line"
          class="red accent-5"
        />
      </MDBRow>
      <MDBRow className="mb-4">
      <MDBCol xl="6" md="6" className="mb-r">
          <LineChart 
            url="https://api.blockchain.info/charts/market-price?timespan=180days&format=json&cors=true"
            chartTitle="Bitcoin Price"
          />
        </MDBCol>
        <MDBCol xl="6" md="6" className="mb-r">
        <LineChart 
            url="https://api.blockchain.info/charts/mempool-size?timespan=180days&daysAverageString=7&format=json&cors=true"
            chartTitle="Mempool Size"
          />
        </MDBCol>
        {/* <MDBCol xl="6" md="6" className="mb-r">
          <MempoolChart />
        </MDBCol> */}
      </MDBRow>
    </div>
  )
}

export default AdminCardSection1
