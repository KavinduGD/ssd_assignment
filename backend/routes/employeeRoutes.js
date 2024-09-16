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
const rateLimiter = require("../controllers/rate-limiter");

const router = express.Router();

// Define rate limiter options
const createEmployeeRateLimiterOptions = {
  freeRetries: 30,
  minWait: 2 * 60 * 60, // 2 hours in seconds
  maxWait: 2 * 60 * 60, // 2 hours in seconds
  lifetime: 60 * 60, // 1 hour in seconds
};

// Apply the custom rate limiter to the create employee route
router.post("/", protect, rateLimiter(createEmployeeRateLimiterOptions), upload.single("image"), createEmployee);

// Other routes remain unchanged

// Get all employees
router.get("/", getAllEmployees);

// Get a single employee
router.get("/:id", getEmployeeById);

// Update employee --manager
router.patch("/:id", protect, rateLimiter(createEmployeeRateLimiterOptions), upload.single("image"), updateEmployee);

// Change employee password --manager
router.patch("/changePassword/:id", protect, updateEmployeePassword);

// Delete employee --manager
router.delete("/:id", protect, deleteEmployee);

module.exports = router;