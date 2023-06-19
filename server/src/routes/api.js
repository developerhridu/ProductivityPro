const express = require('express');
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")

const router = express.Router();

// User Routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/profileDetails", AuthVerifyMiddleware, UserController.userProfileDetails);
router.post("/profileUpdate", AuthVerifyMiddleware, UserController.userProfileUpdate);

// Tasks Routes
router.post("/addTask", AuthVerifyMiddleware, TaskController.addTask);
router.put("/updateTask/:taskID", AuthVerifyMiddleware, TaskController.updateTask);
router.get("/readAllTask", AuthVerifyMiddleware, TaskController.readAllTasks);
router.delete("/deleteTask/:taskID", AuthVerifyMiddleware, TaskController.deleteTask);
router.delete("/deleteMultipleTasks", AuthVerifyMiddleware, TaskController.deleteMultipleTasks);
router.post("/searchTasks", AuthVerifyMiddleware, TaskController.searchTasks);
router.get("/getTask/:taskID", TaskController.getTaskByTaskID);






module.exports=router;