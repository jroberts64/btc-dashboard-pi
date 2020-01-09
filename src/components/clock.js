import React, { useState, useEffect } from "react"
import getDateTime from "../lib/dateTime"
import "./clock.css"

const MyClock = (props) => {
  const [curDateTime, setCurDateTime] = useState(null)
  const ticking = ["tick", "tock"]
  const [whichTick, setWhichTick] = useState(0)
  
  useEffect( () => {
    console.log(ticking[whichTick] + " -- " + whichTick)
    whichTick ? setWhichTick(0) : setWhichTick(1)
    if (typeof window !== `undefined`) {
      const id = window.setInterval(() => {
        setCurDateTime(getDateTime(new Date(), true, " | "))
      }, 1000);
      return () => {
        window.clearInterval(id);
      };
    }
  },[curDateTime]);
  
  return (
  <div className="clock">
    { curDateTime }
    </div>
    )
  }
  
  export default MyClock