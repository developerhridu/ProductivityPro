import React, { useState } from 'react';
import { AddTaskRequest } from '../APIRequest/APIRequest';
import TaskForm from "./TaskForm";

const Create = () => {
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        let updatedCategories = [...taskCategory];

        if (checked) {
            updatedCategories.push(value);
        } else {
            updatedCategories = updatedCategories.filter((category) => category !== value);
        }

        setTaskCategory(updatedCategories);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const success = await AddTaskRequest(
                taskName,
                taskCategory,
                taskStatus,
                taskDescription,
                responsiblePerson,
                startDate,
                endDate
            );

            if (success) {
                // alert('Task created successfully!');
            } else {
                // alert('Task creation failed.');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="container mt-5 col-xl-6">
            <h1>Add ToDo</h1>
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

export default Create;
