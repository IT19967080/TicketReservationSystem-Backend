import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/common.module.css";

function ReservationManagementHeader() {

    const navigate = useNavigate();
    function logOut() {
        sessionStorage.clear();
        navigate('/customer-login');
    }

    return (

        <Navbar
            sticky="top"
            bg="light"
            expand="lg"
            variant="light"
            className={styles.navbar}>
            <Container fluid>
                <Navbar.Brand href="/dashboard">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        <Nav.Link href="/addtrain" className={styles.navLink} >
                            Add Reservation
                        </Nav.Link>
                        <Nav.Link href="/viewtrain" className={styles.navLink} >
                            Reservation Infomation
                        </Nav.Link>

                        <Nav.Link href="/customer-profile" className={styles.navLink} >
                            Profile
                        </Nav.Link>

                        <Nav.Link className={styles.navLink} onClick={() => {
                            logOut();
                        }}  ><BiLogOut /></Nav.Link>

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default ReservationManagementHeader;