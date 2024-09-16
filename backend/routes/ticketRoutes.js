const express = require("express");
const { addTicket, getAllTickets ,getAllTicketsSingleUser} = require("../controllers/ticketController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addTicket);

router.get("/", getAllTickets);

router.get("/:id", protect, getAllTicketsSingleUser);

module.exports = router;
