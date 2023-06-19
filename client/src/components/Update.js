import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetTaskRequest, UpdateTaskRequest } from '../APIRequest/APIRequest';
import TaskForm from "./TaskForm";

const Update = () => {
    const { taskID } = useParams();
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState([]);
    const [taskStatus, setTaskStatus] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const task = await GetTaskRequest(taskID);
                setTaskName(task.name);
                setTaskCategory(task.category);
                setTaskStatus(task.status);
                setTaskDescription(task.description);
                setResponsiblePerson(task.responsiblePerson);
                setStartDate(task.startDate);
                setEndDate(task.endDate);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchTask();
    }, [taskID]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Join taskCategory array with commas
        const taskCategoryString = taskCategory.join(", ");

        try {
            const success = await UpdateTaskRequest(
                taskID,
                taskName,
                taskCategoryString,
                taskStatus,
                taskDescription,
                responsiblePerson,
                startDate,
                endDate
            );

            if (success) {
                // Task update successful
            } else {
                // Task update failed
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="container mt-5 col-xl-6">
            <h1>Update Task</h1>
            <TaskForm
                handleSubmit={handleSubmit}
                taskName={taskName}
                setTaskName={setTaskName}
                taskCategory={taskCategory}
                setTaskCategory={setTaskCategory}
                taskStatus={taskStatus}
                setTaskStatus={setTaskStatus}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
                responsiblePerson={responsiblePerson}
                setResponsiblePerson={setResponsiblePerson}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
        </div>
    );
};

export default Update;
