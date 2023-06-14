import React, { useState, useEffect } from 'react';
import { ReadTaskRequest } from '../APIRequest/APIRequest';

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);

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

    useEffect(() => {
        populateTable(tasks);
    }, [tasks]);

    const populateTable = (tasksToDisplay) => {
        const tableBody = document.getElementById('taskTableBody');
        tableBody.innerHTML = '';

        tasksToDisplay.forEach((task) => {
            const row = document.createElement('tr');
            row.innerHTML = `
      <td><input type="checkbox" value="" /></td>
      <td>${task.taskName || ''}</td>
      <td>${task.taskCategory || ''}</td>
      <td>${task.taskStatus || ''}</td>
      <td>${task.taskDescription || ''}</td>
      <td>${task.responsiblePerson || ''}</td>
      <td>${task.startDate || ''}</td>
      <td>${task.endDate || ''}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="">
          <i class="fas fa-edit"></i>Edit
        </button>
      </td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="">
          <i class="fas fa-trash"></i>Delete
        </button>
      </td>
    `;

            tableBody.appendChild(row);
        });
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
