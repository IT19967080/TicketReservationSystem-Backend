import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Row,
  Col,
  Card,
} from "reactstrap";

import Header from "./Header";
import PageTitle from "../PageTitle";
//import { ReactSession } from "react-client-session";
import { BsPeopleFill } from "react-icons/bs";
import { BiSolidTrain } from "react-icons/bi";
import { MdFeedback } from "react-icons/md";

function BackDashboard() {
  const navigate = useNavigate();

  document.documentElement.classList.remove("nav-open");

  const clickTrainManagemnt = () => {
    navigate("/viewtrain");
  };

  const clickTravellerProfileManagement = () => {
    navigate("/view-traveler-profiles");
  };

  useEffect(() => {
    // console.log(sessionStorage.getItem("customer"));
    //    if(sessionStorage.getItem("customer") == null){
    //         navigate("/customer-login");
    //    }
    //    email = sessionStorage.getItem("customer");
    //    console.log(email);
  }, []);

  return (
    <>
      <Header />
      <PageTitle pageTitle="Back Office Dashboard" />

      <br></br>
      <center>
        <Row>
          <Col>
            <Card
              onClick={clickTrainManagemnt}
              style={{ width: "18rem", height: "30rem" }}
            >
              <BiSolidTrain
                style={{
                  alignSelf: "center",
                  marginBottom: "2rem",
                  marginTop: "2rem",
                }}
                size={40}
              />
              <label style={{ fontSize: "2rem" }}>TRAIN MANAGEMENT</label>
              <label
                className="dashboard-card-subtitle"
                style={{
                  marginTop: "1rem",
                  fontSize: "0.8rem",
                  fontWeight: "normal",
                }}
              >
                Manage Train information
              </label>
            </Card>
          </Col>
          <Col>
            <Card
              className="dashboard-card"
              id="card1"
              onClick={clickTravellerProfileManagement}
              style={{ width: "18rem", height: "30rem" }}
            >
              <BsPeopleFill
                style={{
                  alignSelf: "center",
                  marginBottom: "2rem",
                  marginTop: "2rem",
                }}
                size={40}
              />
              <label style={{ fontSize: "2rem" }}>
                TRAVELLER PROFILE MANAGEMENT
              </label>
              <label
                className="dashboard-card-subtitle"
                style={{
                  marginTop: "1rem",
                  fontSize: "0.8rem",
                  fontWeight: "normal",
                }}
              >
                Activation and deactivation of Traveler accounts
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

export default BackDashboard;
