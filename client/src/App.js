import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./components/Login";
import Register from "./components/Register";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import { getToken, setToken, setUserDetails } from "./helpers/SessionHelper";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    if (getToken()) {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/createTask" element={<CreatePage />} />
                        <Route path="/userProfile" element={<ProfilePage />} />
                        {/*<Route path="/updateTask" element={<UpdatePage />} />*/}
                        <Route path="/updatePage/:taskID" element={<UpdatePage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </div>
        );
    } else {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<LoginPage />} />
                    </Routes>
                </Router>
            </div>
        );
    }
};

export default App;
