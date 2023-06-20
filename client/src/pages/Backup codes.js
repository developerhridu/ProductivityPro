import React, { useState, useEffect } from 'react';
import { ReadTaskRequest } from '../APIRequest/APIRequest';

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);
    // const [filteredTasks, setFilteredTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const userId = localStorage.getItem('token');
            const tasks = await ReadTaskRequest(userId);
            setTasks(tasks);
            // setFilteredTasks(tasks);
            populateTable(tasks);
        } catch (error) {
            console.log('Error fetching tasks:', error);
        }
    };

    const populateTable = (tasksToDisplay) => {
        const tableBody = document.getElementById('taskTableBody');
        tableBody.innerHTML = '';

        const userId = localStorage.getItem('token');

        tasksToDisplay.forEach((task) => {
            if (task.userId === userId) {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td><input type="checkbox" value="${task.id}" /></td>
          <td>${task.taskName}</td>
          <td>${task.taskCategory}</td>
          <td>${task.taskStatus}</td>
          <td>${task.taskDescription}</td>
          <td>${task.responsiblePerson}</td>
          <td>${task.startDate}</td>
          <td>${task.endDate}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="editTask('${task.id}')">
              <i class="fas fa-edit"></i>Edit
            </button>
          </td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')">
              <i class="fas fa-trash"></i>Delete
            </button>
          </td>
        `;

                tableBody.appendChild(row);
            }
        });
        const totalPages = Math.ceil(tasksToDisplay.length / itemsPerPage);
        generatePagination(totalPages, currentPage);
    };



    const changePage = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const tasksToDisplay = filteredTasks.slice(startIndex, endIndex);
        populateTable(tasksToDisplay);
    };

    const filterTasks = () => {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter((task) =>
            task.taskName.toLowerCase().includes(searchTerm) ||
            task.taskCategory.toLowerCase().includes(searchTerm) ||
            task.taskStatus.toLowerCase().includes(searchTerm) ||
            task.taskDescription.toLowerCase().includes(searchTerm) ||
            task.responsiblePerson.toLowerCase().includes(searchTerm)
        );

        setFilteredTasks(filteredTasks);
        changePage(1);
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
                            <tbody id="taskTableBody"></tbody>
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


