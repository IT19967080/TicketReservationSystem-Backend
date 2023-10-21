
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import "../../styles/formdata.module.css"
import PageTitle from '../PageTitle';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import TrainScheduleManagementHeader from './trainScheduleManagementHeader';

function AddSchedule() {

  const [trainName, settrainName] = useState("Ruhunu Kumari");
  const [date, setdate] = useState("");
  const [starttime, setstarttime] = useState("");
  const [endtime, setendtime] = useState("");
  const [source, setsource] = useState("");
  const [destination, setdestination] = useState("");
  const [schedule, setschedule] = useState([]);
  const [traindata, settraindata] = useState([]);
  const [activatedtrains, setactivatedtrains] = useState([]);

  // const [handletextarea, sethandletextarea] = useState(false)
  const [sucessfull, setSucessfull] = useState(false);
  var navigate = useNavigate();
  var [status, setstatus] = useState("");

  useEffect(() => {

    fetch("api/train").then(r => r.json()).then(response => {
      console.log("Hi")
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

  // useEffect(() => {
    
  //   //setactivatedtrains(activatedtraindata)
  //   console.log('Activated Trains:', activatedtrains);
  // }, [activatedtrains]);

  async function submitSchedule(e) {
    e.preventDefault();

    // Convert starttime and endtime to Date objects
    console.log(starttime.split(':'))
    const startTimeParts = starttime.split(':');
    const endTimeParts = endtime.split(':');
    const startDateTime = new Date(0, 0, 0, startTimeParts[0], startTimeParts[1]);
    const endDateTime = new Date(0, 0, 0, endTimeParts[0], endTimeParts[1]);

    // Check if the train is already scheduled for the specified date and time
    const isTrainScheduled = schedule.some((item) => {
      console.log(item.startTime)
      const itemStartTime = new Date(0, 0, 0, item.startTime.split(':')[0], item.startTime.split(':')[1]);
      const itemEndTime = new Date(0, 0, 0, item.endTime.split(':')[0], item.endTime.split(':')[1]);

      return (
        item.date === date &&
        item.trainName === trainName &&
        itemEndTime >= startDateTime &&
        itemStartTime <= endDateTime
      );
    });

    if (isTrainScheduled) {
      // If the train is already scheduled, display an alert
      alert('Train is already reserved for this date and time.');
    } else {
      // If the train is not scheduled, proceed to submit the schedule
      if (source.length >= 1) {
        setSucessfull(false);
        const newTrain = {
          date,
          trainName,
          starttime,
          endtime,
          source,
          destination,
        };

        // The rest of your code to submit the schedule goes here
        console.log(newTrain)
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };


        await axios.post(`api/train`, newTrain, {
          headers: headers, // Use the headers with the CSRF token
          credentials: "include",
          mode: "cors",
        })
          .then((res) => {

            toast.success('Schedule Added!', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log(res.data)

            setdate("");
            setstarttime("");
            settrainName("");
            setendtime("");
            setsource("");
            setdestination("");
            setSucessfull(false);

          })
          .catch((err) => {
            alert(err);
          });

      } else {
        setSucessfull(true);
        // alert("Please enter more than 10 characters.")
      }
    }


  }




  function clear() {
    // setdateofComplaint("");
    // setreason("Issue in the shed");
    // setcomplaintDetails("");
    // setSucessfull(false)
  }

  return (
    <>
      <TrainScheduleManagementHeader />
      <PageTitle pageTitle="Add New Schedule" />
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
              <form onSubmit={submitSchedule} >
                <div class="form-group">
                  <label for="exampleFormControlSelect1" style={{ float: "left" }}>Train Name</label>
                  <select value={trainName} onChange={(e) => { settrainName(e.target.value) }} class="form-control form-select" required>
                  {traindata.map((train) => (
          <option key={train.Id} value={train.trainName}>
            {train.trainName}
          </option>
                    ))}
                  </select>
                </div>
                <br></br>
                <div class="form-group">
                  <label for="exampleFormControlInput1" style={{ float: "left" }}>Date</label>
                  <input value={date} onChange={(e) => { setdate(e.target.value) }} type="date" class="form-control" id="exampleFormControlInput1" required />
                </div>
                <br></br>


                <div class="form-group">
                  <label for="exampleFormControlInput1" style={{ float: "left" }}>Start Time </label>
                  <input value={starttime} onChange={(e) => { setstarttime(e.target.value) }} type="time" class="form-control" id="exampleFormControlInput1" placeholder="Enter Schedule Id" title="follow requested format Ex:([name@example.com])" required="required" />
                </div>
                <br></br>
                <div class="form-group">
                  <label for="exampleFormControlInput1" style={{ float: "left" }}>End Time </label>
                  <input value={endtime} onChange={(e) => { setendtime(e.target.value) }} type="time" class="form-control" id="exampleFormControlInput1" placeholder="Enter Schedule Id" title="follow requested format Ex:([name@example.com])" required="required" />
                </div>

                <br></br>
                <div class="form-group">
                  <label for="exampleFormControlInput1" style={{ float: "left" }}>Source </label>
                  <input value={source} onChange={(e) => { setsource(e.target.value) }} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Source" title="follow requested format Ex:([name@example.com])" required="required" />
                </div>
                <div class="form-group">
                  <br></br>
                  <div class="form-group">
                    <label for="exampleFormControlInput1" style={{ float: "left" }}>Destination </label>
                    <input value={destination} onChange={(e) => { setdestination(e.target.value) }} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Destination" title="follow requested format Ex:([name@example.com])" required="required" />
                  </div>
                  <div class="form-group"></div>

                </div>
                <br></br> <br></br>
                <div class="form-group">

                  <button style={{ width: "100%", backgroundColor: "#ff762e" }} type="submit" className="btn btn-primary  ">Add Schedule</button>
                  <ToastContainer></ToastContainer>
                  <button style={{ width: "100%", backgroundColor: " #082344", marginTop: "10px" }} onClick={() => { clear() }} className="btn btn-primary ">Reset</button>
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

export default AddSchedule;


