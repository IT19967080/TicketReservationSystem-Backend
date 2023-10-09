import React, { useState, useRef } from "react";
import { Container, Form, FormGroup, Input, Label, Button } from "reactstrap";

function CreateTravelerProfile() {
  const [nic, setnic] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNo, setphoneNo] = useState(0);
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
    fetch("/api/travelers", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Traveler profile created!");
      })
      .catch((error) => alert("An error occurred"));
  };

  return (
    <Container>
      <h2>Create Traveler Profile</h2>
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
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter password here..."
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
}

export default CreateTravelerProfile;
