
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import "../../styles/addcomplaint.module.css"
import PageTitle from '../PageTitle';
import ComplaintHeader from './trainManagementHeader';

import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AddTrain(){
  
    const [trainname, settrainname] = useState("");
    const [drivername, setdrivername] = useState("");
    const [capacity,setcapacity] = useState("");
    const [traintype,settriantype] = useState("Express");
    var   [status, setstatus] = useState(false);

    // const [handletextarea, sethandletextarea] = useState(false)
    const [sucessfull, setSucessfull] = useState(false);
    var navigate = useNavigate();
 

    useEffect (() =>{
    
        // fetch("api/train").then(r=> r.json()).then(response=>{  
        //     console.log("Hi")   
        //       console.log(response)
        //       setschedule(response)
        //   }).catch(e=>console.log("The error fetching all schedules",e))

      
     },[])

 

     async function  submitTrain(e){
      e.preventDefault();
      

        // If the train is not scheduled, proceed to submit the schedule
        if (trainname.length >= 1) {
          setSucessfull(false);
          const newTrainData = {
            traintype,
            trainname,
            drivername,
            capacity,
            status,
          };
    
          // The rest of your code to submit the schedule goes here
          console.log(newTrainData)
            const headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
            };
       
        
            await axios.post(`api/traindata`,newTrainData,{
              headers: headers, // Use the headers with the CSRF token
               credentials: "include",
               mode: "cors",
             })
              .then((res) => {
               console.log(res)
                toast.success('Train Data Added!', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                console.log(res.data)  
            
                
                settrainname("");
                setcapacity("");
                setdrivername("");
                settriantype("");
                
                
              })
              .catch((err) => {
                console.log(err)
                alert(err);
              });
    
        } else {
          setSucessfull(true);
          // alert("Please enter more than 10 characters.")
        }
      

      
   }




    function clear(){
        // setdateofComplaint("");
        // setreason("Issue in the shed");
        // setcomplaintDetails("");
        // setSucessfull(false)
    }

    return(
        <>
        <ComplaintHeader/>
        <PageTitle pageTitle="Publish New Train"/> 
        <div style={{backgroundColor: '#ff762e',textalign: 'left', width: '100%', height: '2px'}}></div>
        <center>
        <div className="card" style={{width: "50rem",borderRadius: "2em",
        borderStyle: 'solid',
        borderColor: ' #ff762e',margin:"100px",padding:"50px",
        display: 'flex',
        justifyContent: 'center',
        }} 
        >
        <div className="card-body">

     
        <div>
        <form onSubmit={submitTrain} >
        
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Train Name</label>
          <input value={trainname} onChange={(e)=>{settrainname(e.target.value)}}  type="text" class="form-control"  placeholder="Enter Train Name"  id="exampleFormControlInput1" required/>
        </div>
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlSelect1" style={{float:"left"}}>Train Type</label>
          <select value={traintype} onChange={(e)=>{settriantype(e.target.value)}} class="form-control form-select" required>
          <option>Express</option>
          <option>local</option>
          <option>freight</option>
      </select>
        </div>
        <br></br>
   
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Capacity </label>
          <input  value={capacity} onChange={(e)=>{setcapacity(e.target.value)}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Capacity" title="follow requested format Ex:([name@example.com])"  required="required" />
        </div>
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Driver Name </label>
          <input  value={drivername} onChange={(e)=>{setdrivername(e.target.value)}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Driver Name" title="follow requested format Ex:([name@example.com])"  required="required" />
        </div>

        <br></br>
        <br></br>

        <div class="form-group">
          
        <button style={{width : "100%", backgroundColor: "#ff762e"}} type="submit"  className="btn btn-primary  ">Add Train</button>
        <ToastContainer></ToastContainer>
        <button style={{width : "100%", backgroundColor: " #082344",marginTop:"10px"}}  onClick={()=>{clear()}} className="btn btn-primary ">Reset</button>
        </div>
        </form>
        {/* <button onClick={testCsurfClicked}>Test Csurf Post Call</button> */}
        </div>
        </div>    
        </div>
        </center>        
        </>     
    );
}

export default AddTrain;


