import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import PageTitle from '../PageTitle';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from 'react-bootstrap'
import TrainManagementHeader from './trainManagementHeader';
import TrainScheduleManagementHeader from './trainScheduleManagementHeader';
library.add(faPen);


const ViewSchedule = () => {

  const [trainschedule, settrainschedule] = useState([]);
  const [show, setshow] = useState(false)
  const [deletedata, setdeletedata] = useState({})
  const [searchVal, setSearchVal] = useState("");
  let { filterData } = useState();


  const handleClose = () => {
    setshow(false)
  }

  const navigate = useNavigate();
  useEffect(() => {

    fetch("api/train").then(r => r.json()).then(response => {
      console.log("Hi")
      console.log(response)
      settrainschedule(response)
    }).catch(e => console.log("The error fetching all schedules", e))
  }, [])

  const getData = () => {
    console.log("aaa")

    axios.get(`api/train`)
      .then((res) => {
        settrainschedule(res.data);
      })
  }
  function updateSchedule(data) {
    console.log(data)
    console.log(data.id)
    navigate(`/editschedule/${data.id}`)
  }


  const deleteSchedule = (data) => {
    setdeletedata(data)
    console.log(data.id)
    setshow(true)

  }

  const handleDelete = () => {
    console.log(deletedata)
    axios.delete(`api/train/${deletedata.id}`).then((data) => {
      setshow(false)
      toast.success('Schedule Deleted!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getData();
    })
  }

  const filterSchedule = e => {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      getData();
    }
  }

  const globalSearch = () => {

    filterData = trainschedule.filter((value) => {

      return (
        value.trainName.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.date.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.startTime.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.endTime.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.source.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.destination.toLowerCase().includes(searchVal.toLowerCase())
      )
    })
    console.log(filterData)
    settrainschedule(filterData)

  }
  return (
    <>

      <TrainScheduleManagementHeader />
      <PageTitle pageTitle="Train Schedules" />
      <div style={{ backgroundColor: '#ff762e', textalign: 'left', width: '100%', height: '2px' }}></div>
      <br></br><br></br>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure You Want To Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>This Action Cannot Be Undone !</Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#ff762e" }} variant="secondary" onClick={handleDelete}>
            Confirm
          </Button>
          <Button style={{ backgroundColor: " #082344" }} variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="panel-heading">
        <div class="input-group">
          <input style={{ maxWidth: "200px", marginLeft: "1130px", border: "1px solid #082344" }} id="searchText" type="text" class="form-control" name="q" placeholder="Search Here" onChange={filterSchedule} allowClear value={searchVal} />
          <span class="input-group-btn">
            <a id="x" class="btn btn-default hide" href="#" title="Clear"><i class="glyphicon glyphicon-remove"></i> </a>
            <button onClick={globalSearch} style={{ backgroundColor: "#082344", maxwidth: "200px", color: "white" }} class="btn btn-info" type="submit" >  Search  </button>
          </span>
        </div>
      </div>
      <br></br>
      <div className='container-xl' style={{ padding: "2rem 0rem", alignItems: "center", justifyContent: "center", borderradius: '5px 5px 0 0' }}>
        <div className='row'>
          <div className='col-12'>
            <table className="table" style={{ minwidth: "100px", }}>
              <thead style={{ backgroundColor: '#082344', color: 'white', textalign: 'left', fontweight: 'bold' }}>
                <tr>

                  <th scope="col">TrainName</th>
                  <th scope="col">Date</th>
                  <th scope="col">StartTime</th>
                  <th scope="col">EndTime</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destinaiton</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>

                {trainschedule.map((data, index) => {
                  return (
                    <tr style={{}}>
                      <td>{data.trainName}</td>
                      <td>{data.date}</td>
                      <td>{data.startTime}</td>
                      <td>{data.endTime}</td>
                      <td>{data.source}</td>
                      <td>{data.destination}</td>
                      <td>
                        <i onClick={() => {
                          updateSchedule(data)
                        }} class="fa fa-pencil-square" aria-hidden="true"></i>
                        <a onClick={() => {
                          deleteSchedule(data)
                        }}><i style={{ marginLeft: "20px", marginRight: "20px" }} class="fa fa-trash" aria-hidden="true"
                        ></i></a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>


  )
}

export default ViewSchedule


