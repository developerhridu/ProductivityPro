import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState([]);
    const [taskStatus, setTaskStatus] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleCategoryChange = (event) => {
        const selectedCategories = Array.from(event.target.querySelectorAll('input[name="taskCategory"]:checked')).map(
            (checkbox) => checkbox.value
        );
        setTaskCategory(selectedCategories);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Create a new task object
            const task = {
                taskName,
                taskCategory,
                taskStatus,
                taskDescription,
                responsiblePerson,
                startDate,
                endDate,
            };

            // Make a POST request to save the task data
            await axios.post('/api/tasks', task);

            // Reset the form
            setTaskName('');
            setTaskCategory([]);
            setTaskStatus('');
            setTaskDescription('');
            setResponsiblePerson('');
            setStartDate('');
            setEndDate('');

            // Show success message or perform any other action
            alert('Task created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Task creation failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5 col-xl-6">
            <h1>Add ToDo</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="taskCategory">Task Category:</label>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="workRelated"
                            name="taskCategory"
                            value="Work-related"
                            checked={taskCategory.includes('Work-related')}
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label" htmlFor="workRelated">
                            Work-related
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="personal"
                            name="taskCategory"
                            value="Personal"
                            checked={taskCategory.includes('Personal')}
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label" htmlFor="personal">
                            Personal
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="academic"
                            name="taskCategory"
                            value="Academic"
                            checked={taskCategory.includes('Academic')}
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label" htmlFor="academic">
                            Academic
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="taskStatus">Task Status:</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="notStarted"
                            name="taskStatus"
                            value="Not Started"
                            checked={taskStatus === 'Not Started'}
                            onChange={(e) => setTaskStatus(e.target.value)}
                            required
                        />
                        <label className="form-check-label" htmlFor="notStarted">
                            Not Started
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="inProgress"
                            name="taskStatus"
                            value="In Progress"
                            checked={taskStatus === 'In Progress'}
                            onChange={(e) => setTaskStatus(e.target.value)}
                            required
                        />
                        <label className="form-check-label" htmlFor="inProgress">
                            In Progress
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="completed"
                            name="taskStatus"
                            value="Completed"
                            checked={taskStatus === 'Completed'}
                            onChange={(e) => setTaskStatus(e.target.value)}
                            required
                        />
                        <label className="form-check-label" htmlFor="completed">
                            Completed
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="taskDescription">Task Description:</label>
                    <textarea
                        className="form-control"
                        id="taskDescription"
                        rows="3"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="responsiblePerson">Responsible Person:</label>
                    <select
                        className="form-control"
                        id="responsiblePerson"
                        value={responsiblePerson}
                        onChange={(e) => setResponsiblePerson(e.target.value)}
                    >
                        <option value="Hridu">Hridu</option>
                        <option value="Awwab">Awwab</option>
                        <option value="Azhar">Azhar</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" id="submitButton">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Create;
