const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeePassword,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const protect = require("../middleware/authMiddleware");
const { upload } = require("../util/fileUpload");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Create a rate limiter
const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});


//create employee  -- manager
router.post("/", protect,createAccountLimiter, upload.single("image"), createEmployee);
//get all employees
router.get("/", getAllEmployees);
//get a single employee
router.get("/:id", getEmployeeById);
//update employee ---manager
router.patch("/:id", protect, upload.single("image"), updateEmployee);
//change employee password  --manager
router.patch("/changePassword/:id", protect, updateEmployeePassword);
//delete employee  --manager
router.delete("/:id", deleteEmployee);

module.exports = router;
