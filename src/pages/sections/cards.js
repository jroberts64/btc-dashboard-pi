import React from "react"
import {
  MDBCard,
  MDBIcon,
  MDBCol,
} from "mdbreact"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"

const Card = (props) => {
  return (
    <MDBCol xl="3" md="3" className="mb-r">
    <MDBCard className="cascading-admin-card">
      <div className="admin-up">
        <MDBIcon icon={props.icon} className={props.class} />
        <div className="data">
          <p>{props.desc}</p>
          <h4>
            <strong>{props.value}</strong>
          </h4>
        </div>
      </div>
    </MDBCard>
    </MDBCol>
  )
}

export const CardLong = (props) => {
  return (
    <MDBCol xl="6" md="6" className="mb-r">
    <MDBCard className="cascading-admin-card">
      <div className="admin-up">
        <div className="data">
          <p>{props.desc}</p>
          <h4>
            <strong>{props.value}</strong>
          </h4>
        </div>
      </div>
    </MDBCard>
    </MDBCol>
  )
}

export default Card
