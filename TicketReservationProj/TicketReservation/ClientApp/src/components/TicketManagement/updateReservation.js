import { useState, useEffect } from "react";
import axios from 'axios';
import React from "react";
import "../../styles/formdata.module.css"
import { useParams ,useNavigate} from "react-router-dom"
import PageTitle from "../PageTitle";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AgentHeader from "../Common/TravelAgentHeader";

const UpdateReservation = () => {

  const [referenceId, setreferenceId] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [trainName, settrainName] = useState("");
  const [dateOfBooking, setdateOfBooking] = useState("");
  const [timeOfBooking, settimeOfBooking] = useState("");
  const [ticketCount, setticketCount] = useState("");
  const [sucessfull, setSucessfull] = useState(false);
  const { id } = useParams();
  const [traindata, settraindata] = useState([]);
  const [selecteddate, setselecteddate] = useState([]);
  const [selectedtime, setselectedtime] = useState([]);
  const [schedule, setschedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`api/ticket/${id}`).then((res) => {

      console.log(res.data)
      settrainName(res.data.trainName)
      setdateOfBooking(res.data.dateOfBooking)
      settimeOfBooking(res.data.timeOfBooking)
      setreferenceId(res.data.referenceId)
      setcustomerName(res.data.customerName)
      setticketCount(res.data.ticketCount)


    }).catch((err) => {
      console.log(err)
    })

    fetch("api/train").then(r => r.json()).then(response => {
      
      console.log(response)
      setschedule(response)

    }).catch(e => console.log("The error fetching all schedules", e))

    fetch("api/traindata/activated").then(r => r.json()).then(response => {
      console.log("Hi")
      console.log(response)
      settraindata(response)
      // const activatedtraindata = response.filter((train) => train.status === 'activated');
      // setactivatedtrains(activatedtraindata)
      console.log('Activated Trains:', response); 

    }).catch(e => console.log("The error fetching all schedules", e))


  }, [])


  function UpdateReservation(e) {

    // Get the current date
    const currentDate = new Date();

    // Parse the selected date from the input field
    const selectedDate = new Date(dateOfBooking);

    // Calculate the difference in milliseconds between the selected date and the current date
    const dateDifference = selectedDate - currentDate;

    // Calculate the number of days difference (30 days = 30 * 24 * 60 * 60 * 1000 milliseconds)
    const daysDifference = dateDifference / (24 * 60 * 60 * 1000);

    if (daysDifference < 0 || daysDifference > 30) {
      alert("Reservation date must be within 30 days from the current date.");
      return;
    }
    e.preventDefault();
    if (trainName.length >= 1) {
      setSucessfull(false);
      const newupdatedReservation = {
        trainName,
        dateOfBooking,
        timeOfBooking,
        referenceId,
        customerName,
        ticketCount
      }
      console.log(newupdatedReservation)
      axios.put(`api/ticket/${id}`, newupdatedReservation).then((res) => {
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
        navigate("/viewticket");
      }).catch((err) => {
        console.log(err)
      })
    } else {
      setSucessfull(true)
    }
  }



// Function to handle train name selection
const handleTrainNameChange = (e) => {
  
  const selectedTrainName = e.target.value;
  console.log(selectedTrainName)
  settrainName(selectedTrainName);
  
  console.log('trainSchedules:', schedule);
  

  const selectedTrainDates = schedule
  .filter((train) => train.trainName === selectedTrainName)
  .map((train) => {
    console.log(train.date); // Log the date here
    return train.date; // Return the date
  });

  const selectedTrainTimes = schedule
  .filter((train) => train.trainName === selectedTrainName)
  .map((train) => {
    console.log(train.startTime); // Log the date here
    return train.startTime; // Return the date
  });

  console.log(selectedTrainDates)
  console.log(selectedTrainTimes)
  setselecteddate(selectedTrainDates)
  setselectedtime(selectedTrainTimes)
};

// Function to handle train name selection
const handleTrainDateChange = (e) => {
  
  const selectedtraindate = e.target.value;
  console.log(selectedtraindate)
  setdateOfBooking(selectedtraindate);
  
  console.log('trainSchedules:', schedule);
  

  // const selectedTrainDates = schedule
  // .filter((train) => train.trainName === selectedTrainName)
  // .map((train) => {
  //   console.log(train.date); // Log the date here
  //   return train.date; // Return the date
  // });

  const selectedTrainTimes = schedule
  .filter((train) => train.date === selectedtraindate && train.trainName === trainName)
  .map((train) => {
    console.log(train.startTime); // Log the date here
    return train.startTime; // Return the date
  });

  //console.log(selectedTrainDates)
  console.log(selectedTrainTimes)
  console.log(timeOfBooking)
  //setselecteddate(selectedTrainDates)
  setselectedtime(selectedTrainTimes)
};


// Function to handle train name selection
const handleTrainTimeChange = (e) => {
  
  const selectedtraintime = e.target.value;
  console.log(selectedtraintime)
  settimeOfBooking(selectedtraintime);
  
  console.log('trainSchedules:', schedule);
};



  return (
    <>
      <AgentHeader />
      <PageTitle pageTitle="Update New Reservation" />
      <div style={{ backgroundColor: '#ff762e', textalign: 'left', width: '100%', height: '2px' }}></div>
      <center>
        <div className="card" style={{
          width: "50rem", borderRadius: "2em",
          borderStyle: 'solid',
          borderColor: ' #ff762e', margin: "100px", padding: "50px",
          display: 'flex',
          justifyContent: 'center',
        }}
        >
          <div className="card-body">

            <div>
              <form onSubmit={UpdateReservation} >

                <br></br>
                <div class="form-group">
                  <label for="exampleFormControlInput1" style={{ float: "left" }}>ReferenceId </label>
                  <input value={referenceId} onChange={(e) => { setreferenceId(e.target.value) }} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Schedule Id" title="follow requested format Ex:([name@example.com])" required="required" />
                </div>
                <br></br>
                <div class="form-group">
                  <label for="exampleFormControlInput1" style={{ float: "left" }}>Name </label>
                  <input value={customerName} onChange={(e) => { setcustomerName(e.target.value) }} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Schedule Id" title="follow requested format Ex:([name@example.com])" required="required" />
                </div>
                <br></br>
                <div class="form-group">
                  <label for="exampleFormControlSelect1" style={{ float: "left" }}>Train Name</label>
                  <select value={trainName} onChange={handleTrainNameChange} class="form-control form-select" required>
                  <option value="" >Select a Train Name</option>
                  {Array.from(new Set(schedule.map(train => train.trainName))).map(trainName => (
    <option key={trainName} value={trainName}>
      {trainName}
    </option>
  ))}
                  </select>
                </div>
                <br></br>
                <div class="form-group">
                  <label for="exampleFormControlInput1" style={{ float: "left" }}>Date</label>
                  <select value={dateOfBooking} onChange={handleTrainDateChange} class="form-control form-select" required>
                  <option value="" >Select a Date</option>
                  {Array.from(new Set(selecteddate)).map((trainDate) => (
    <option key={trainDate} value={trainDate}>
      {trainDate}
          </option>
                    ))}
                  </select>
                </div>
                <br></br>


                <div class="form-group">
                  <label for="exampleFormControlInput1" style={{ float: "left" }}>Time </label>
                  <select value={timeOfBooking} onChange={handleTrainTimeChange}  class="form-control form-select" required>
                  <option value="" >Select a time</option>
                  {selectedtime.map((trainTime) => (
          <option  key={trainTime} value={trainTime}>
            {trainTime}
          </option>
                    ))}
                  </select>
                </div>


                <br></br>


<div class="form-group">
  <label for="exampleFormControlInput1" style={{ float: "left" }}> No of Ticket </label>
  <input value={ticketCount} onChange={(e) => { setticketCount(e.target.value) }} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Number of tickets" title="follow requested format Ex:([name@example.com])" required="required" />
</div>

                <div class="form-group">
                  <br></br> <br></br>
                  <div class="form-group">
                    <button style={{ width: "100%", backgroundColor: "#ff762e", }} type="submit" className="btn btn-primary  ">Update Reservation</button>
                    <br />
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
