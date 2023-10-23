import { useState } from "react";
import PageTitle from "../PageTitle";
import styles from "../../styles/customer.module.css"
import common from "../../styles/common.module.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserLogin() {

  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  function login() {

    const newCus = {
      password,
      username,
    }

    axios.post(`api/user`,newCus).then((res) =>{

        console.log(res)
        if(res.data) {
          console.log(res.data);
           sessionStorage.setItem("user" , res.data );
           if(res.data.role=='Admin'){
              navigate("/backofficedashboard"); 
           }else if(res.data.role=='Travel Agent'){
              navigate("/travelagentdashboard"); 
           }
           
  }
  else {
    alert("Check Credentials");
  }
       // if(res.data.status === true){

            // sessionStorage.setItem("customer" , email );
            // console.log(res.data.userData);
            // console.log(res.data.msg);
            // sessionStorage.setItem("CusId" , res.data.userData._id );
            // navigate("/dashboard");
        //}
        // else if(res.data.status === false){
        //     console.log(res.data.msg);
        //     alert("Check Credentials");
        // }
        // else{
        //     console.log("err");
        // }
    }).catch((err) =>{
        console.log(err);
        alert(err)
    })
  }
  return (
    <>
      <PageTitle pageTitle="Sign In" />
      <div className={styles.loginWrap}>
        <div className={styles.loginForm}>
          <Form>
            <FormGroup className={styles.form}>
              <Label for="email">UserName</Label>
              <Input
                id="email"
                className={styles.input}
                name="email"
                placeholder="Enter your email"
                type="email"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                className={styles.input}
                name="name"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button
              className={common.btnPrimary}
              onClick={login}
              style={{
                width: "500px",
                marginTop: "30px",
                marginBottom: "10px",
              }}
            >
              Sign In
            </Button>
          </Form>
          <br />
          <div style={{ float: "left" }}>
            New user ? <a href="/register">Register New Account</a>
          </div>

        </div>

      </div>
    </>
  )
}

export default UserLogin;