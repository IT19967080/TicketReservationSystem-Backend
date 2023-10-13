import React,{useEffect,useState} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import PageTitle from '../PageTitle';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Modal,Button} from 'react-bootstrap'
import AgentHeader from '../Common/TravelAgentHeader';
library.add(  faPen);

  
const ViewReservation = () => {

  const [reservationData,setreservationData] = useState([]);
  const [show,setshow] = useState(false)
  const [deletedata,setdeletedata] = useState({})
  const [searchVal , setSearchVal] = useState("");
  const [trainschedule,settrainschedule] = useState([]);
  let {filterData} = useState();
  

  const handleClose =()=>{
    setshow(false)
  }

  const navigate = useNavigate();
  useEffect(()=>{
  
    fetch("api/ticket").then(r=> r.json()).then(response=>{  
      console.log("Hi")   
        console.log(response)
        setreservationData(response)
    }).catch(e=>console.log("The error fetching all schedules",e))

    fetch("api/train").then(r=> r.json()).then(response=>{  
        console.log("Hi")   
          console.log(response)
          settrainschedule(response)
      }).catch(e=>console.log("The error fetching all schedules",e))

  },[])

  const getData = () => {
    console.log("aaa")
    
    axios.get(`api/ticket`)
        .then((res) => {
          setreservationData(res.data);
    })
  }
 
  function updateReservation(data){

     // Calculate the difference in days between the current date and the reservation date
     const currentDate = new Date();
     const reservationDate = new Date(data.date); // Assuming deletedata.date contains the reservation date
     const daysDifference = Math.floor((reservationDate - currentDate) / (24 * 60 * 60 * 1000));
   
     console.log(daysDifference)

     if (daysDifference >= 5) {

        navigate(`/editreservation/${data.id}`)
      
    } else {
        // Show an error message indicating that reservations can only be canceled at least 5 days in advance
        alert("Reservations can only be updated at least 5 days in advance.");
        // Optionally, you can prevent the deletion from happening
        // handleClose(); // Close the modal without performing the deletion
      }
 

    
 }


  const deletereservationData = (data)=>{

     // Calculate the difference in days between the current date and the reservation date
     const currentDate = new Date();
     const reservationDate = new Date(data.date); // Assuming deletedata.date contains the reservation date
     const daysDifference = Math.floor((reservationDate - currentDate) / (24 * 60 * 60 * 1000));
   
     console.log(daysDifference)
     if (daysDifference >= 5) {
       // Perform the deletion action here
       // Call your API to delete the reservation or perform the necessary actions
       setdeletedata(data)
       console.log(data.id)
       setshow(true)
       // After successful deletion, close the modal and update the state as needed
       //handleClose();
       // ... additional logic for deletion
     } else {
       // Show an error message indicating that reservations can only be canceled at least 5 days in advance
       alert("Reservations can only be canceled at least 5 days in advance.");
       // Optionally, you can prevent the deletion from happening
       // handleClose(); // Close the modal without performing the deletion
     }

   
    
  }

  const handleDelete = ()=>{
    
        axios.delete(`api/ticket/${deletedata.id}`).then((data)=>{
            setshow(false)
            toast.success('Ticket Reservation Deleted!', {
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

  const filterComplaints = e =>{
    setSearchVal(e.target.value);
    if(e.target.value === ""){
      getData();
    }
  }

  const globalSearch = () =>{
 
    filterData = reservationData.filter((value)=>{
      
      return(
        value.trainName.toLowerCase().includes(searchVal.toLowerCase()) || 
        value.date.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.referenceId.toLowerCase().includes(searchVal.toLowerCase()) ||    
        value.time.toLowerCase().includes(searchVal.toLowerCase()) 
        
      )     
    })
    console.log(filterData)
    setreservationData(filterData)
   
  }
  return (
    <>

     <AgentHeader/>
     <PageTitle pageTitle="Reservation Information"/> 
        <div style={{backgroundColor: '#ff762e',textalign: 'left', width: '100%', height: '2px'}}></div>
    <br></br><br></br>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure You Want To Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>This Action Cannot Be Undone !</Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#ff762e"}} variant="secondary" onClick={handleDelete}>
            Confirm
          </Button>
          <Button style={{backgroundColor: " #082344"}}variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="panel-heading">
                        <div class="input-group">
                            <input style={{maxWidth:"200px",marginLeft:"1130px",border:"1px solid #082344"}} id="searchText"type="text" class="form-control" name="q" placeholder="Search Here" onChange = {filterComplaints} allowClear value={searchVal}/>
                            <span class="input-group-btn">
                                <a  id="x" class="btn btn-default hide" href="#" title="Clear"><i class="glyphicon glyphicon-remove"></i> </a>
                                <button onClick={globalSearch}style={{backgroundColor: "#082344",maxwidth:"200px",color:"white"}}class="btn btn-info" type="submit" >  Search  </button>
                            </span>
                        </div>
                    </div>
                    <br></br>
        <div className='container-xl' style={{  padding: "2rem 0rem",alignItems:"center",justifyContent:"center",borderradius: '5px 5px 0 0'}}>
        <div className='row'>
        <div className='col-12'>
        <table className="table" style={ {minwidth: "100px",}}>
        <thead  style={{backgroundColor: '#082344',color: 'white',textalign: 'left',fontweight: 'bold'}}>
          <tr>
          <th scope="col">Name</th>
          <th scope="col">TrainName</th>
          <th scope="col">ReservationId</th>
          <th scope="col">Time</th>
          <th scope="col">Date</th>
          <th scope="col">Actions</th>
         </tr>
        </thead>
        <tbody>
  
        {reservationData.map((data,index)=>{    
        return(
          <tr style={{}}>
          <td>{data.name}</td>
          <td>{data.trainName}</td>
          <td>{data.referenceId}</td>
          <td>{data.time}</td>
          <td>{data.date}</td>
          <td>     
          <i onClick = {()=>{
                                  updateReservation(data)
                                }} class="fa fa-pencil-square" aria-hidden="true"></i>
          <a onClick = {()=>{
                                  deletereservationData(data)
                                }}><i style={{marginLeft:"20px", marginRight:"20px"}} class="fa fa-trash" aria-hidden="true"  
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

export default ViewReservation


