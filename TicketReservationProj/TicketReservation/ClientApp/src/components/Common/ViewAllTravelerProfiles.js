import React, { useState, useEffect } from "react";
import Header from "./Header";
import PageTitle from "../PageTitle";
import styles from "../../styles/customer.module.css";
import axios from "axios";

function ViewAllTravelerProfiles() {
  const [travelers, settravelers] = useState([]);

  const getTravelers = async () => {
    await axios
      .get("api/travelers")
      .then((res) => {
        settravelers(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deactivate = async (nic) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm(
      `Are you sure you wan to activate account with ${nic} ?`
    );
    if (confirmed) {
      await axios
        .put(`api/travelers/deactivate/${nic}`)
        .then((res) => {
          alert("Success");

          getTravelers();
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const activate = async (nic) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm(
      `Are you sure you wan to activate account with ${nic} ?`
    );
    if (confirmed) {
      await axios
        .put(`api/travelers/activate/${nic}`)
        .then((res) => {
          alert("Success");
          getTravelers();
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  useEffect(() => {
    getTravelers();
  }, []);

  return (
    <div>
      <Header />
      <PageTitle pageTitle="View Travelers" />
      <div className={styles.TableContainer}>
        <table class="table table-hover">
          <thead
            style={{
              backgroundColor: "#082344",
              color: "white",
              textalign: "left",
              fontweight: "bold",
            }}
          >
            <tr>
              <th scope="col">#</th>
              <th scope="col">NIC</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Phone No.</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {travelers.map((data, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data.nic}</td>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.dateOfBirth}</td>
                  <td>{data.phoneNo}</td>
                  <td>{data.email}</td>
                  <td>{data.isActive ? "Active" : "Deactivated"}</td>
                  <td>
                    {data.isActive ? (
                      <button
                        style={{
                          border: "none",
                          borderRadius: 5,
                          background: "red",
                          color: "white",
                        }}
                        onClick={() => deactivate(data.nic)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        style={{
                          border: "none",
                          borderRadius: 5,
                          background: "green",
                          color: "white",
                        }}
                        onClick={() => activate(data.nic)}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllTravelerProfiles;
