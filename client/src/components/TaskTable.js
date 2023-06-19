import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReadTaskRequest, DeleteTaskRequest } from '../APIRequest/APIRequest';

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const tasks = await ReadTaskRequest();
            setTasks(tasks);
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

    return (
        <div>
            <div className="container mt-3">
                <div className="row mt-3">
                    <div className="col">
                        <table className="table table-striped">
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
                            <tbody>
                            {tasks.map((task) => (
                                <tr key={task.taskID}>
                                    <td><input type="checkbox" value="" /></td>
                                    <td>{task.taskName || ''}</td>
                                    <td>{task.taskCategory || ''}</td>
                                    <td>{task.taskStatus || ''}</td>
                                    <td>{task.taskDescription || ''}</td>
                                    <td>{task.responsiblePerson || ''}</td>
                                    <td>{task.startDate || ''}</td>
                                    <td>{task.endDate || ''}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(task.taskID)}>
                                            <i className="fas fa-edit"></i>Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(task.taskID)}>
                                            <i className="fas fa-trash"></i>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <nav>
                            <ul className="pagination" id="paginationContainer"></ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;
