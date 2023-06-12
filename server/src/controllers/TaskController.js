const path = require('path');
const fs = require('fs');

// const taskFilePath = path.join(__dirname, '../database/tasks.json');
const usersFilePath = path.join(__dirname, '../database/users.json');

exports.addTask = (req, res) => {
    const email = req.headers['email'];
    const reqBody = req.body;

    if (!reqBody || Object.keys(reqBody).length === 0) {
        return res.status(400).json({ error: 'Request body is empty.' });
    }

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        const users = JSON.parse(data);
        const userIndex = users.findIndex((user) => user.email === email);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = users[userIndex];
        const { tasks } = user;

        const newTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
        const newTask = {
            id: newTaskId,
            ...reqBody,
        };
        tasks.push(newTask);
        users[userIndex].tasks = tasks;

        fs.writeFile(usersFilePath, JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing data file:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(200).json({ message: 'Task created successfully!', task: newTask });
        });
    });
};
