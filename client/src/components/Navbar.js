import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/todo.png';
import '../assets/css/CustomNavbar.css';
import {removeSessions} from "../helpers/SessionHelper";

const CustomNavbar = () => {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <img className="nav-logo" src={logo} alt="Add Task Icon" />
                    ToDo App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/" exact>
                            All List
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/createTask">
                            Add ToDo
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/userProfile">
                            User Profile
                        </Nav.Link>
                    </Nav>
                    <button className="btn btn-primary my-lg-0 ms-auto" onClick={removeSessions}>
                        Logout
                    </button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
