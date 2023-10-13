import React from "react";
import {  useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


import {
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import Header from "./Header";
import PageTitle from "../PageTitle";
//import { ReactSession } from "react-client-session";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidTrain } from "react-icons/bi";
import { RiTicket2Line } from "react-icons/ri";
import AgentHeader from "./TravelAgentHeader";






function TravelAgentDashboard() {
  const navigate = useNavigate();

  document.documentElement.classList.remove("nav-open");

  const clickTicketBookingManagement = () => {
    navigate("/viewticket");
  };

  const clickTravellerProfileManagement = () => {
    //navigate("/customer-profile");
  };




  useEffect(() => {
    // console.log(sessionStorage.getItem("customer"));
    //    if(sessionStorage.getItem("customer") == null){
    //         navigate("/customer-login");
    //    }  
    //    email = sessionStorage.getItem("customer");
    //    console.log(email);
  }, [])

  return (
    <>

      <AgentHeader />
      <PageTitle pageTitle="Travel Agent Dashboard" />

      <br></br>
      <center>
        <Row>
          <Col>
            <Card

              onClick={clickTravellerProfileManagement}
              style={{ width: "18rem", height: "30rem" }}
            >
              <BsPeopleFill style={{ alignSelf: "center", marginBottom: "2rem", marginTop: "2rem" }} size={40} />
              <label style={{ fontSize: "2rem" }}>TRAVELLER MANAGEMENT</label>
              <label className="dashboard-card-subtitle" style={{ marginTop: "1rem", fontSize: "0.8rem", fontWeight: "normal" }}>
                Manage Traveller information.
              </label>
            </Card>
          </Col>
          <Col>
            <Card
              className="dashboard-card"
              id="card1"
              onClick={clickTicketBookingManagement}
              style={{ width: "18rem", height: "30rem" }}
            >
              <RiTicket2Line style={{ alignSelf: "center", marginBottom: "2rem", marginTop: "2rem" }} size={40} />
              <label style={{ fontSize: "2rem" }}>TICKET BOOKING MANAGEMENT</label>
              <label className="dashboard-card-subtitle" style={{ marginTop: "1rem", fontSize: "0.8rem", fontWeight: "normal" }}>
                Manage ticket booking information.
              </label>
            </Card>
          </Col>

        </Row>
      </center>

      <br></br>
      <br></br>





    </>
  );
}

export default TravelAgentDashboard;