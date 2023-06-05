import React, { Component } from 'react';
import{BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import CreatePage from "./pages/CreatePage"
import UpdatePage from "./pages/UpdatePage"


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path='/register' element={<RegisterPage/>} />
                        <Route exact path="/createTask" element={<CreatePage/>}/>
                        <Route exact path="/updateTask" element={<UpdatePage/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;