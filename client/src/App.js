import React, { Component } from 'react';
import{BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path='/register' element={<RegisterPage/>} />
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;