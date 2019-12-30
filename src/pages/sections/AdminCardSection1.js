import React, { useState } from "react"
import { MDBRow, MDBCol } from "mdbreact"

import LineExample from "../../components/priceChart.js"
import MempoolChart from "../../components/mempoolChart.js"

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

  function getDate() {
    const currentdate = new Date()
    // return currentdate.toLocaleString()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

     return months[currentdate.getMonth()]  + " "
      + currentdate.getDate() + ", "
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes()
      // + currentdate.getSeconds();
  }

  function timeToHalving(blocks) {
    console.log("timeToHalving called")
    const totalMinutesToHalving = Number(blocks) * 10 + 10
    const minutesPerDay = 24 * 60
    const daysToHalving = Math.floor(totalMinutesToHalving / minutesPerDay)
    const hoursToHalving = Math.floor(
      (totalMinutesToHalving - daysToHalving * minutesPerDay) / 60
    )
    const minutesToHalving =
      totalMinutesToHalving -
      daysToHalving * minutesPerDay -
      hoursToHalving * 60
    return (
      daysToHalving +
      " days " +
      hoursToHalving +
      " hrs " +
      minutesToHalving +
      "ish mins"
    )
  }

  if (typeof window !== `undefined`) {
    fetch("https://api.blockchain.info/stats")
      .then(res => res.json())
      .then(json => {
        setPrice(
          new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
            json.market_price_usd
          )
        )
        // setPrice(new Intl.NumberFormat('en-US', { notation: "compact" , compactDisplay: "long"  }).format(json.market_price_usd))
        setHeight(new Intl.NumberFormat("en-US").format(json.n_blocks_total))
        setTradeVol(
          new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
            json.trade_volume_usd / 1000000
          )
        )
        setNextHalfBlocks(210000 - (Number(json.n_blocks_total) % 210000))
        setTrxVol(json.trade_volume_usd)
      })
      .catch(err => {
        console.log(err)
      })
  }

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
          value={"$" + price}
          icon="money-bill-wave"
          class="green accent-5"
        />
        <AdminCard
          desc="Block Height"
          value={height}
          icon="text-height"
          class="yellow accent-5"
        />
        <AdminCard
          desc="Blocks to Next Halvening"
          value={new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
          }).format(nextHalfBlocks)}
          icon="hourglass-half"
          class="blue accent-5"
        />
        <AdminCard
          desc="24 hr Trading Volume"
          value={
            "$" +
            new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
              trxVol / 1000000
            ) +
            "M"
          }
          icon="chart-line"
          class="red accent-5"
        />
      </MDBRow>
      <MDBRow className="mb-4">
        <MDBCol xl="6" md="6" className="mb-r">
          <LineExample />
        </MDBCol>
        <MDBCol xl="6" md="6" className="mb-r">
          <MempoolChart />
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default AdminCardSection1
