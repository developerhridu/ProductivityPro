import React from 'react';
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";
import Search from "../components/Search";


const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <h3>To Do</h3>
                <Search/>
                <TaskTable/>
            </div>


        </div>
    );
};

export default HomePage;