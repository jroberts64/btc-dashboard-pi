import React, { useState, useEffect } from "react"
import getDateTime from "../lib/dateTime"
import "./clock.css"

const MyClock = (props) => {
  const [curDateTime, setCurDateTime] = useState(null)
  
  useEffect( () => {
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