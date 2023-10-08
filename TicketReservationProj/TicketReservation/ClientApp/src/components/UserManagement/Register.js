// Only To Super Admin

import { useState  } from "react";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { Button, Form, FormGroup, Label, Input , Row , Col , FormText } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../Common/Header";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function UserRegistration() {

    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [surname, setsurname] = useState("");
    const [role, setRole] = useState("");
    const [password, setpassword] = useState("");
    const [confPassword, setconfPassword] = useState("");

    const demo = () => {
      setemail("rishitha@gmail.com");
      setname("Rishitha");
      setsurname("Dilshan");

      setpassword("rishitha1");
      setconfPassword("rishitha1");

    };

    const submit = (e) => {
      e.preventDefault();

    //   const vehicles = [{
    //     vehicleType : vehicleType ,
    //     vehicleChassis : vehicleChassis ,
    //     vehicleNumber : vehicleNumber
    //   }]
      
      const newCus = {
        email,
        name,
        surname,
        role,
        password
      }
      axios
        .post("http://localhost:8070/customers/checkEmail", {
          email,
        })
        .then((res) => {
          if (res.data.status) {
            alert("An account with the same email exists!");
          } else {
            if (password === confPassword) {
              axios.post("http://localhost:8070/customers/register" , newCus ).then(() =>{
                
                toast.success('Registration Succesful!', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                setTimeout(() =>{
                  e.target.reset();
                  navigate("/customer-login");
                } , 4000)
                
              }).catch((err) =>{
                alert(err);
              })
            } else {
              alert("Password does not match!");
            }
          }
        })
        .catch((e) => {
          alert(e);
        });
    };
  

  
    return (
      <div>
        <Header/>
        <PageTitle pageTitle="Registration" />
        <div className={styles.createAccWrapper} style ={{paddingTop:"35rem"}}>
          <div className={styles.createAccForm} style = {{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" , borderColor:"black" , borderStyle:"groove" , padding: "3rem" , marginBottom:"5rem"}}>
            <br />
            <Form onSubmit={(e) => submit(e)}>
              <h4>Personal Information</h4>
              <hr/>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  className={styles.input}
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="name">Surname</Label>
                <Input
                  id="surname"
                  className={styles.input}
                  name="name"
                  placeholder="Enter your surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setsurname(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="name">Email</Label>
                <Input
                  id="email"
                  className={styles.input}
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                    <Label for="role">Role</Label>
                    <Input
                    id="role"
                    className={styles.input}
                    name="role"
                    type="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    >
                    <option value="" disabled>Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="Travel Agent">Travel Agent</option>
                    </Input>
                </FormGroup>
              <Row>
              <Col md={6}> 
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  className={styles.input}
                  name="password"
                  placeholder="Enter a password"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  pattern=".{8,}"
                  required
                />
                <FormText>Password must contain atleast 8 characters</FormText>
              </FormGroup>
              </Col> 
              <Col md={6}> 
              <FormGroup>
                <Label for="confPassword">Confirm Password</Label>
                <Input
                  id="confPassword"
                  className={styles.input}
                  name="password"
                  placeholder="Re-enter your passowrd"
                  type="password"
                  value={confPassword}
                  onChange={(e) => setconfPassword(e.target.value)}
                  pattern=".{8,}"
                  required
                />
              </FormGroup>
              </Col>
              </Row>    
        
              <Button
                className={common.btnPrimary}
                style={{
                  width: "100%",
                  marginTop: "30px",
                  marginBottom: "10px",
                }}
              >
                Register
              </Button>

            </Form>
            
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    );
}

export default UserRegistration;