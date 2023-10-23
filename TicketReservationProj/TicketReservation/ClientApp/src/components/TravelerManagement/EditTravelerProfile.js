import React, { useState, useRef, useEffect } from "react";
import { Container, Form, FormGroup, Input, Label, Button } from "reactstrap";
import Header from "../Common/Header";
import PageTitle from "../PageTitle";
import styles from "../../styles/customer.module.css";
import common from "../../styles/common.module.css";
import { useLocation } from "react-router-dom";

function CreateTravelerProfile() {
  const location = useLocation();
  const [nic1, setnic1] = useState("");
  const [nic, setnic] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNo, setphoneNo] = useState(0);
  const [confPassword, setconfPassword] = useState("");
  /* const nic = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const dateOfBirth = useRef(null);
  const email = useRef(null); */

  const submit = (e) => {
    e.preventDefault();
    console.log(nic);

    const data = {
      nic,
      firstName,
      lastName,
      dateOfBirth,
      email,
      phoneNo,
      password,
      isActive: true,
    };
    fetch(`/api/travelers/${nic1}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Traveler profile updated!");
      })
      .catch((error) => alert("An error occurred"));
  };

  useEffect(() => {
    setnic1(location.state.data.nic);
    setnic(location.state.data.nic);
    setfirstName(location.state.data.firstName);
    setlastName(location.state.data.lastName);
    setemail(location.state.data.email);
    setpassword(location.state.data.password);
    setphoneNo(location.state.data.phoneNo);
    setdateOfBirth(location.state.data.dateOfBirth);
  }, []);

  return (
    <div>
      <Header />
      <PageTitle pageTitle="Edit Traveler Profile" />
      <Container style={{ marginTop: 20, marginBottom: 20 }}>
        <Form onSubmit={submit}>
          <FormGroup>
            <Label for="nic">National Identity Card Number (NIC)</Label>
            <Input
              value={nic}
              onChange={(e) => setnic(e.target.value)}
              id="nic"
              name="nic"
              placeholder="Ex:- 2000123456V"
              type="text"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="2000-01-01"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setdateOfBirth(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">E-Mail</Label>
            <Input
              id="email"
              name="email"
              placeholder="john.d@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNo">Phone No.</Label>
            <Input
              id="phoneNo"
              name="phoneNo"
              placeholder="772665133"
              type="phone"
              value={phoneNo}
              onChange={(e) => setphoneNo(e.target.value)}
              required
            />
          </FormGroup>

          <Button
            color="primary"
            style={{
              width: "100%",
              backgroundColor: "#ff762e",
              border: "none",
            }}
          >
            Update Profile
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateTravelerProfile;
