import { useState,useEffect } from "react";
import axios from 'axios';
import React from "react";
import "../../styles/addcomplaint.module.css"
import {useParams} from "react-router-dom"
import PageTitle from "../PageTitle";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AgentHeader from "../Common/TravelAgentHeader";

const UpdateReservation = () => {

  const [referenceId, setreferenceId] = useState("");
  const [name, setname] = useState("");
  const [trainName, settrainName] = useState("Ruhunu Kumari");
  const [date, setdate] = useState("");
  const [time,settime] = useState("");
    const [sucessfull, setSucessfull] = useState(false);
    const {id} = useParams();
    const [traindata,settraindata] = useState([]);

  useEffect(()=>{
    
    axios.get(`api/ticket/${id}`).then((res)=>{
      
      console.log(res.data)
      settrainName(res.data.trainName)
      setdate(res.data.date)
      settime(res.data.time)
      setreferenceId(res.data.referenceId)
      setname(res.data.name)
        


    }).catch((err)=>{
      console.log(err)
    })

  fetch("api/traindata").then(r=> r.json()).then(response=>{  
            console.log("Hi")   
              //console.log(response)
              settraindata(response)
          }).catch(e=>console.log("The error fetching all schedules",e))

  
  },[])


  function UpdateReservation(e){

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
    e.preventDefault();
    if(trainName.length>=1){   
    setSucessfull(false);
    const newupdatedReservation = {
        trainName,
        date,
        time,
        referenceId,
        name
     }
     console.log(newupdatedReservation)
     axios.put(`api/ticket/${id}`,newupdatedReservation).then((res)=>{
         console.log(res)
         console.log("Hi")
         e.target.reset();
         alert("Reservation Updated Successfully")
         toast.success('Reservation Updated Successfully!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
     }).catch((err)=>{
      console.log(err)
    })}else{
      setSucessfull(true)
    }
  }

  return (
    <>
        <AgentHeader/>
        <PageTitle pageTitle="Update New Reservation"/> 
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
        <form onSubmit={UpdateReservation} >

        <br></br>
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>ReferenceId </label>
          <input  value={referenceId} onChange={(e)=>{setreferenceId(e.target.value)}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Schedule Id" title="follow requested format Ex:([name@example.com])"  required="required" />
        </div>
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Name </label>
          <input  value={name} onChange={(e)=>{setname(e.target.value)}} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Schedule Id" title="follow requested format Ex:([name@example.com])"  required="required" />
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
          <input value={date} onChange={(e)=>{setdate(e.target.value)}}  type="date" class="form-control" id="exampleFormControlInput1" required/>
        </div>
        <br></br>
        
   
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Time </label>
          <input  value={time} onChange={(e)=>{settime(e.target.value)}} type="time" class="form-control" id="exampleFormControlInput1" placeholder="Enter Schedule Id" title="follow requested format Ex:([name@example.com])"  required="required" />
        </div>
       

        
    
        <div class="form-group">
        <br></br> <br></br>
      <div class="form-group">
      <button style={{width : "100%", backgroundColor: "#ff762e",}} type="submit" className="btn btn-primary  ">Update Reservation</button>
      <br/>
      </div>
        </div>
        </form>
        {/* <button onClick={testCsurfClicked}>Test Csurf Post Call</button> */}
        </div>
        </div>    
        </div>
        </center>        
        </>     
  )
}

export default UpdateReservation
