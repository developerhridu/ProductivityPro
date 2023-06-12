const path = require('path');
const fs = require('fs');
// const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');


const taskFilePath = path.join(__dirname, '../database/todo.json');


exports.addTask = (req, res) => {
    const userID = req.headers['userID'];
    const reqBody = req.body;

    if (!reqBody || Object.keys(reqBody).length === 0) {
        return res.status(400).json({ error: 'Request body is empty.' });
    }

    const newTask = {
        taskID: uuidv4(),
        userID,
        ...reqBody,
    };

    fs.readFile(taskFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading task data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        const tasks = JSON.parse(data);
        tasks.push(newTask);

        fs.writeFile(taskFilePath, JSON.stringify(tasks), (err) => {
            if (err) {
                console.error('Error writing task data file:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(200).json({ message: 'Task created successfully!', task: newTask });
        });
    });
};

exports.updateTask = (req, res) => {
    const userID = req.headers['userID'];
    const taskID = req.params.taskID;
    const reqBody = req.body;

    if (!reqBody || Object.keys(reqBody).length === 0) {
        return res.status(400).json({ error: 'Request body is empty.' });
    }

    fs.readFile(taskFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading task data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        const tasks = JSON.parse(data);
        // const taskIndex = tasks.findIndex((task) => task.taskID === taskID);
        const taskIndex = tasks.findIndex((task) => task.taskID === String(taskID));


        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        const updatedTask = {
            taskID,
            userID,
            ...reqBody,
        };

        tasks[taskIndex] = updatedTask;

        fs.writeFile(taskFilePath, JSON.stringify(tasks), (err) => {
            if (err) {
                console.error('Error writing task data file:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(200).json({ message: 'Task updated successfully!', task: updatedTask });
        });
    });
};


