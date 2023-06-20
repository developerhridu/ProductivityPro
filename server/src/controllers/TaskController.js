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
    console.log("Hello update")

    if (!reqBody || Object.keys(reqBody).length === 0) {
        return res.status(400).json({ error: 'Request body is empty.' });
    }

    fs.readFile(taskFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading task data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        const tasks = JSON.parse(data);
        console.log(`Data : `,data)
        const taskIndex = tasks.findIndex((task) => task.taskID == taskID);


        if (taskIndex === -1) {
            return res.status(405).json({ error: 'Task not found.' });
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

exports.readAllTasks = (req, res) => {
    const userID = req.headers['userID'];
    const page = parseInt(req.params.page);
    console.log("Page Number is ", page);
    const itemsPerPage = 5;
    if (isNaN(page)) 
    {
        page = 1;
    }
    
    console.log("Page Number is ", page);
  
    fs.readFile(taskFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading task data file:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }
  
      const tasks = JSON.parse(data);
      const userTasks = tasks.filter((task) => task.userID === userID);
  
      const totalTasks = userTasks.length;
      console.log("Total Number of Task : ", totalTasks);
      const totalPages = Math.ceil(totalTasks / itemsPerPage);
  
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedTasks = userTasks.slice(startIndex, endIndex);
  
      return res.status(200).json({
        tasks: paginatedTasks,
        currentPage: page,
        totalPages: totalPages,
      });
    });
  };
  
  

exports.deleteTask = (req, res) => {
    // const userID = req.headers['userID'];
    const taskID = req.body.taskID;

    fs.readFile(taskFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading task data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        let tasks = JSON.parse(data);
        const taskIndex = tasks.findIndex((task) => task.taskID == taskID);

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        tasks = tasks.filter((task) => task.taskID !== taskID);

        fs.writeFile(taskFilePath, JSON.stringify(tasks), (err) => {
            if (err) {
                console.error('Error writing task data file:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(200).json({ message: 'Task deleted successfully!' });
        });
    });
};

exports.deleteMultipleTasks = (req, res) => {
    console.log("Hridu M");
    const taskIDs = req.body.taskIDs;

    fs.readFile(taskFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading task data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        let tasks = JSON.parse(data);
        const filteredTasks = tasks.filter((task) => !taskIDs.includes(task.taskID));

        if (filteredTasks.length == tasks.length) {
            return res.status(404).json({ error: 'Tasks not found.' });
        }

        fs.writeFile(taskFilePath, JSON.stringify(filteredTasks), (err) => {
            if (err) {
                console.error('Error writing task data file:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(200).json({ message: 'Tasks deleted successfully!' });
        });
    });
};

exports.searchTasks = (req, res) => {
    const searchCriteria = req.body;

    fs.readFile(taskFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading task data file:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        const tasks = JSON.parse(data);
        const filteredTasks = tasks.filter((task) => {
            if (searchCriteria.taskName && !task.taskName.toLowerCase().includes(searchCriteria.taskName.toLowerCase())) {
                return false;
            }
            if (searchCriteria.taskCategories && searchCriteria.taskCategories.length > 0 && !searchCriteria.taskCategories.includes(task.taskCategory)) {
                return false;
            }
            if (searchCriteria.taskStatus && task.taskStatus !== searchCriteria.taskStatus) {
                return false;
            }
            if (searchCriteria.responsiblePerson && task.responsiblePerson !== searchCriteria.responsiblePerson) {
                return false;
            }
            if (searchCriteria.endDate && new Date(task.endDate) > new Date(searchCriteria.endDate)) {
                return false;
            }

            return true;
        });

        return res.status(200).json({ tasks: filteredTasks });
    });
};


exports.getTaskByTaskID = (req, res) => {
    const taskID = req.params.taskID;
    console.log("Received taskID:", taskID);
  
    fs.readFile(taskFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading task data file:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }
  
      let tasks = JSON.parse(data);
      const task = tasks.find((task) => task.taskID === taskID);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }
  
      return res.status(200).json(task);
    });
  };
  
  
  exports.pagination = (req, res) => {
    const userID = req.headers['userID'];
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 5;
  
    fs.readFile(taskFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading task data file:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }
  
      const tasks = JSON.parse(data);
      const userTasks = tasks.filter((task) => task.userID === userID);
  
      const totalTasks = userTasks.length;
      const totalPages = Math.ceil(totalTasks / itemsPerPage);
  
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedTasks = userTasks.slice(startIndex, endIndex);
  
      return res.status(200).json({
        tasks: paginatedTasks,
        currentPage: page,
        totalPages: totalPages,
      });
    });
  };
  
