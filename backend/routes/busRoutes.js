const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createBus,
  getAllBuses,
  getBusById,
  deleteBusById,
} = require("../controllers/busController");
const { upload } = require("../util/fileUpload");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});


//create bus ---manager
router.post("/", protect, createAccountLimiter, upload.single("image"), createBus);
//get all buses
router.get("/", getAllBuses);
//get a single bus
router.get("/:id", getBusById);
//delete bus  --manager
router.delete("/:id", deleteBusById);

module.exports = router;

// {
//   "busId":"b023",
//   "registrationNumber":"r3434",
//   "chassisNumber":"c034343",
//   "model":"double Deker",
//   "seatingCapacity":45,
//   "color":"red",
//   "driver":"656ae638e40573cfa226d554",
//   "conductor":"656ae756c03ab7ebb4257708",
//   "owner":"bus company"
// }
