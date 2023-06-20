import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { ReadTaskRequest, DeleteTaskRequest } from '../APIRequest/APIRequest';
import ReactPaginate from "react-paginate";

const TaskTable = () => {
    const { page } = useParams();
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks(page);
    }, [page]);

    const fetchTasks = async (page) => {
        try {
            const tasksResponse = await ReadTaskRequest(page);
            const { tasks, totalPages, currentPage } = tasksResponse;
            console.log("Front End Page Details: " + currentPage, totalPages);
            setTasks(tasks);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
        } catch (error) {
            console.log('Error fetching tasks:', error);
        }
    };

    const handleEditClick = (taskID) => {
        navigate(`/updatePage/${taskID}`);
    };

    const handleDeleteClick = async (taskID) => {
        try {
            const success = await DeleteTaskRequest(taskID);
            if (success) {
                console.log('Task deleted successfully!');
                setTasks(tasks.filter((task) => task.taskID !== taskID));
            } else {
                console.log('Failed to delete task.');
            }
        } catch (error) {
            console.log('Error deleting task:', error);
        }
    };

    const handlePageChange = ({ selected }) => {
        const newPage = selected + 1;
        setCurrentPage(newPage);
        fetchTasks(newPage);
    };


    return (
        <div className="container mt-3">
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="table-responsive word-wrap-break-word">
                        <Table striped>
                            {/* Table header */}
                            <thead>
                            <tr>
                                <th></th>
                                <th>Task Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Responsible Person</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            {/* Table body */}
                            <tbody>
                            {tasks.map((task) => (
                                <tr key={task.taskID}>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <input type="checkbox" value="" />
                                    </td>
                                    <td>{task.taskName}</td>
                                    <td>{task.taskCategory}</td>
                                    <td>{task.taskStatus}</td>
                                    <td>{task.taskDescription}</td>
                                    <td>{task.responsiblePerson}</td>
                                    <td>{task.startDate}</td>
                                    <td>{task.endDate}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="btn btn-warning"
                                            onClick={() => handleEditClick(task.taskID)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteClick(task.taskID)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-center">
                    <ReactPaginate previousLabel={'Previous'} nextLabel={'Next'} breakLabel={'...'} breakClassName={'page-item'} breakLinkClassName={'page-link'} pageCount={totalPages} forcePage={currentPage - 1} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={handlePageChange} containerClassName={'pagination'} pageClassName={'page-item'} pageLinkClassName={'page-link'} previousClassName={'page-item'} previousLinkClassName={'page-link'} nextClassName={'page-item'} nextLinkClassName={'page-link'} activeClassName={'active'}/>
                </div>
            </div>

        </div>
    );
};

export default TaskTable;
