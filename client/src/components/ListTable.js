import React, { useEffect, useMemo, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DeleteTaskRequest, ReadTaskRequest } from '../APIs/APIRequest';
import FullScreenLoader from './FullScreenLoader';
import Pagination from './Pagination';

let PageSize = 2;
const ListTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tasks.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, tasks]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const tasksResponse = await ReadTaskRequest();
            setTasks(tasksResponse);
            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching tasks:', error);
            setIsLoading(false);
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

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (tasks.length > 0) {
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
                                {currentTableData.map((task) => (
                                    <tr key={task.taskID}>
                                        <td style={{ whiteSpace: 'normal' }}>
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
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={tasks.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div>No tasks found.</div>;
    }
};

export default ListTable;
