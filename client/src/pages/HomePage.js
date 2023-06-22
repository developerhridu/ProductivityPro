import React from 'react';
import Navbar from "../components/Navbar";
import ListTable from "../components/ListTable";
import Search from "../components/Search";


const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <h3>All Tasks</h3>
                <Search/>
                <ListTable/>
            </div>


        </div>
    );
};

export default HomePage;