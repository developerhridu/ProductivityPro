import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
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
        <div className="container mt-3">
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="table-responsive word-wrap-break-word">
                        <Table striped>
                            <thead>
                            <tr>
                                <th></th>
                                <th style={{ maxWidth: '10%', overflow: 'hidden', wordWrap: 'break-word' }}>Task Name</th>
                                <th style={{ maxWidth: '5%', overflow: 'hidden', wordWrap: 'break-word' }}>Category</th>
                                <th style={{ maxWidth: '10%', overflow: 'hidden', wordWrap: 'break-word' }}>Status</th>
                                <th style={{ maxWidth: '15%', overflow: 'hidden', wordWrap: 'break-word' }}>Description</th>
                                <th style={{ maxWidth: '15%', overflow: 'hidden', wordWrap: 'break-word' }}>Responsible Person</th>
                                <th style={{ maxWidth: '10%', overflow: 'hidden', wordWrap: 'break-word' }}>Start Date</th>
                                <th style={{ maxWidth: '10%', overflow: 'hidden', wordWrap: 'break-word' }}>End Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map((task) => (
                                <tr key={task.taskID}>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <input type="checkbox" value="" />
                                    </td>
                                    <td style={{ maxWidth: '10%', overflow: 'hidden', wordWrap: 'break-word' }}>{task.taskName || ''}</td>
                                    <td style={{ maxWidth: '5%', overflow: 'hidden', wordWrap: 'break-word' }}>{task.taskCategory || ''}</td>
                                    <td style={{ maxWidth: '10%', overflow: 'hidden', wordWrap: 'break-word' }}>{task.taskStatus || ''}</td>
                                    <td style={{ maxWidth: '15%', overflow: 'hidden', wordWrap: 'break-word' }}>{task.taskDescription || ''}</td>
                                    <td style={{ maxWidth: '15%', overflow: 'hidden', wordWrap: 'break-word' }}>{task.responsiblePerson || ''}</td>
                                    <td style={{ maxWidth: '10%', overflow: 'hidden', wordWrap: 'break-word' }}>{task.startDate || ''}</td>
                                    <td style={{ maxWidth: '10%', overflow: 'hidden', wordWrap: 'break-word' }}>{task.endDate || ''}</td>
                                    <td>
                                        <Button variant="primary" size="sm" onClick={() => handleEditClick(task.taskID)}>
                                            <i className="fas fa-edit"></i>Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteClick(task.taskID)}>
                                            <i className="fas fa-trash"></i>Delete
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
                <div className="col">
                    <nav>
                        <ul className="pagination" id="paginationContainer"></ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;
