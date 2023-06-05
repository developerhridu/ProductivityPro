import React, { useEffect, useState } from 'react';

const UpdateTaskPage = () => {
    const [task, setTask] = useState({
        id: '',
        taskName: '',
        taskCategory: [],
        taskStatus: '',
        taskDescription: '',
        responsiblePerson: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        // Retrieve task ID from URL parameters
        const taskId = new URLSearchParams(window.location.search).get('taskId');

        // Fetch task details from the API endpoint
        fetch(`/api/tasks/${taskId}`)
            .then(response => response.json())
            .then(data => {
                setTask(data);
            })
            .catch(error => {
                console.log('Error retrieving task details:', error);
            });
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        // Send updated task data to the API endpoint
        fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(data => {
                alert('Task updated successfully!');
                // Redirect to home page or perform any other action
                window.location.href = '/home';
            })
            .catch(error => {
                console.log('Error updating task:', error);
            });
    };

    const handleInputChange = event => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            // Handle checkbox inputs
            const category = event.target.value;
            if (checked) {
                setTask(prevTask => ({
                    ...prevTask,
                    taskCategory: [...prevTask.taskCategory, category]
                }));
            } else {
                setTask(prevTask => ({
                    ...prevTask,
                    taskCategory: prevTask.taskCategory.filter(c => c !== category)
                }));
            }
        } else {
            // Handle other input types
            setTask(prevTask => ({
                ...prevTask,
                [name]: value
            }));
        }
    };

    return (
        <div className="container mt-5">
            <h1>Update ToDo</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="taskName"
                        name="taskName"
                        value={task.taskName}
                        onChange={handleInputChange}
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
                            checked={task.taskCategory.includes('Work-related')}
                            onChange={handleInputChange}
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
                            checked={task.taskCategory.includes('Personal')}
                            onChange={handleInputChange}
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
                            checked={task.taskCategory.includes('Academic')}
                            onChange={handleInputChange}
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
                            checked={task.taskStatus === 'Not Started'}
                            onChange={handleInputChange}
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
                            checked={task.taskStatus === 'In Progress'}
                            onChange={handleInputChange}
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
                            checked={task.taskStatus === 'Completed'}
                            onChange={handleInputChange}
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
                        name="taskDescription"
                        rows="3"
                        value={task.taskDescription}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="responsiblePerson">Responsible Person:</label>
                    <select
                        className="form-control"
                        id="responsiblePerson"
                        name="responsiblePerson"
                        value={task.responsiblePerson}
                        onChange={handleInputChange}
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
                        name="startDate"
                        value={task.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={task.endDate}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateTaskPage;
