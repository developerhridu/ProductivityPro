import React, { useState } from 'react';
import { AddTaskRequest } from '../APIRequest/APIRequest';

const TaskForm = ({
                      handleSubmit,
                      taskName,
                      setTaskName,
                      taskCategory,
                      setTaskCategory,
                      taskStatus,
                      setTaskStatus,
                      taskDescription,
                      setTaskDescription,
                      responsiblePerson,
                      setResponsiblePerson,
                      startDate,
                      setStartDate,
                      endDate,
                      setEndDate,
                  }) => {
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

    return (
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
            {/*<div className="form-group">*/}
            {/*    <label htmlFor="startDate">Start Date:</label>*/}
            {/*    <input*/}
            {/*        type="date"*/}
            {/*        className="form-control"*/}
            {/*        id="startDate"*/}
            {/*        value={startDate}*/}
            {/*        onChange={(e) => setStartDate(e.target.value)}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div className="form-group">*/}
            {/*    <label htmlFor="endDate">End Date:</label>*/}
            {/*    <input*/}
            {/*        type="date"*/}
            {/*        className="form-control"*/}
            {/*        id="endDate"*/}
            {/*        value={endDate}*/}
            {/*        onChange={(e) => setEndDate(e.target.value)}*/}
            {/*    />*/}
            {/*</div>*/}
            <button type="submit" className="btn btn-primary" id="submitButton">
                Submit
            </button>
        </form>
    );
};

export default TaskForm;