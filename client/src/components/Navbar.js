import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/todo.png'
import '../assets/css/CustomNavbar.css';

const CustomNavbar = () => {
    // const AppNavBar = () => {
    //     const logout = () => {
    //         // Your logout logic here
    //     };
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/*<Navbar.Brand className="navbar-brand">*/}
                {/*    <img className="nav-logo" src={logo} alt="Add Task Icon" />*/}
                {/*    ToDo App*/}
                {/*</Navbar.Brand>*/}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
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
                    {/*<button className="btn btn-primary" onClick={logout}>*/}
                    {/*    Logout*/}
                    {/*</button>*/}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
