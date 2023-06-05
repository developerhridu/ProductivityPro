import React from 'react';
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";
import Search from "../components/Search";

const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <h3>Task Management System</h3>
                <Search/>
            </div>
            <TaskTable/>


        </div>
    );
};

export default HomePage;