import React from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Card = (props) => {
  return (
    <div className="col-xl-3 col-md-3 mb-r">
      <div className="card cascading-admin-card">
        <div className="admin-up">
          <i className={`fas fa-${props.icon} ${props.class}`}></i>
          <div className="data">
            <p>{props.desc}</p>
            <h4>
              <strong>{props.value}</strong>
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CardLong = (props) => {
  return (
    <div className="col-xl-6 col-md-6 mb-r">
      <div className="card cascading-admin-card">
        <div className="admin-up">
          <div className="data">
            <p>{props.desc}</p>
            <h4>
              <strong>{props.value}</strong>
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
