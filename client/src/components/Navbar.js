import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img/todo.png';
import '../assets/css/CustomNavbar.css';
import {removeSessions} from "../helpers/SessionHelper";

const CustomNavbar = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink to="/" exact className="navbar-brand" onClick={() => navigate('/')}>
                    <img className="nav-logo" src={logo} alt="Add Task Icon" />
                    ProductivityPro
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/" exact>
                            All Tasks
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/createTask">
                            Add Task
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
