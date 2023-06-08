const express = require('express');
const UserController = require("../controllers/UserController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")

const router = express.Router();

// User Routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/profileDetails", AuthVerifyMiddleware, UserController.userProfileDetails);
router.post("/profileUpdate", AuthVerifyMiddleware, UserController.userProfileUpdate);

module.exports=router;