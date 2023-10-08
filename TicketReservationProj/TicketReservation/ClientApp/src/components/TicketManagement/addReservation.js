
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import "../../styles/addcomplaint.module.css"
import PageTitle from '../PageTitle';
import ComplaintHeader from './trainManagementHeader';

import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AddTicket(){
  
    const [referenceId, setreferenceId] = useState("");
    const [name, setname] = useState("");
    const [trainName, settrainName] = useState("Ruhunu Kumari");
    const [date, setdate] = useState("");
    const [time,settime] = useState("");

    const [schedule,setschedule] = useState([]);
    const [traindata,settraindata] = useState([]);

    // const [handletextarea, sethandletextarea] = useState(false)
    const [sucessfull, setSucessfull] = useState(false);
    var navigate = useNavigate();
   

    useEffect (() =>{
    
        fetch("api/train").then(r=> r.json()).then(response=>{  
            console.log("Hi")   
              //console.log(response)
              setschedule(response)
          }).catch(e=>console.log("The error fetching all schedules",e))

      
          fetch("api/traindata").then(r=> r.json()).then(response=>{  
            console.log("Hi")   
              //console.log(response)
              settraindata(response)
          }).catch(e=>console.log("The error fetching all schedules",e))

     },[])

 

     async function  submitSchedule(e){
      e.preventDefault();
      

        // Get the current date
        const currentDate = new Date();
        
        // Parse the selected date from the input field
        const selectedDate = new Date(date);

        // Calculate the difference in milliseconds between the selected date and the current date
        const dateDifference = selectedDate - currentDate;

        // Calculate the number of days difference (30 days = 30 * 24 * 60 * 60 * 1000 milliseconds)
        const daysDifference = dateDifference / (24 * 60 * 60 * 1000);

        if (daysDifference < 0 || daysDifference > 30) {
          alert("Reservation date must be within 30 days from the current date.");
          return;
        }
        // If the train is not scheduled, proceed to submit the schedule
      
          setSucessfull(false);
          const newTicketData = {
            referenceId,
            name,
            trainName,
            date,
            time,
          };
    
          // The rest of your code to submit the schedule goes here
          //console.log(newTicketData)
            const headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
            };
       
        
            await axios.post(`api/ticket`,newTicketData,{
              headers: headers, // Use the headers with the CSRF token
               credentials: "include",
               mode: "cors",
             })
              .then((res) => {
                console.log(res.data.status)
               if(res.data.status=="Error"){
                alert(res.data.message)
               }else{
                toast.success('Ticket Data Added!', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                //console.log(res.data)  
            
                
                settrainName("Ruhunu Kumari");
                setdate("");
                setname("");
                setreferenceId("");
                settime("")
               }
                
                
              })
              .catch((error) => {
                if (error.response && error.response.status === 400) {
                  // Display the error message in an alert or toast
                  alert("Maximum 4 reservations per reference ID are allowed.");
                } else {
                  // Handle other error cases as needed
                  alert("An error occurred while submitting the schedule.");
                }
            
              });
    
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
        <PageTitle pageTitle="Add New Reservation"/> 
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
        <p className="card-text" style={{textAlign: "left"}}>  Please Send us details about the inceident you would like to report. Our Complaint Center will analyze your complaint and take the appropriate measure in order that the reported situation will not oocur at any time the future.</p>
        <hr/> 
        <div>
        <form onSubmit={submitSchedule} >
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>ReferenceId</label>
          <input  value={referenceId} onChange={(e)=>{setreferenceId(e.target.value)}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Reference Id" title="follow requested format Ex:([name@example.com])"  required="required" />
        </div>
        <br></br>
      
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Name</label>
          <input  value={name} onChange={(e)=>{setname(e.target.value)}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Name" title="follow requested format Ex:([name@example.com])"  required="required" />
        </div>
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlSelect1" style={{float:"left"}}>Train Name</label>
          <select value={trainName} onChange={(e)=>{settrainName(e.target.value)}} class="form-control form-select" required>
          {traindata.map((train) => (
            
        <option key={train.id} value={train.trainName}>
          {train.trainName}
        </option>
      ))}
      </select>
        </div>
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Date</label>
          <input  value={date} onChange={(e)=>{setdate(e.target.value)}}  type="date" class="form-control" id="exampleFormControlInput1" required/>
        </div>
        <br></br>
        
   
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}> Time </label>
          <input  value={time} onChange={(e)=>{settime(e.target.value)}} type="time" class="form-control" id="exampleFormControlInput1" placeholder="Enter Schedule Id" title="follow requested format Ex:([name@example.com])"  required="required" />
        </div>
       

        <br></br> <br></br>
        <div class="form-group">
          
        <button style={{width : "100%", backgroundColor: "#ff762e"}} type="submit"  className="btn btn-primary  ">Add Reservation</button>
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
export default AddTicket;


