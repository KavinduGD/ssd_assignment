const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const managerRoutes = require("./routes/managerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const busRoutes = require("./routes/busRoutes");
const roadRouteRoutes = require("./routes/roadRouteRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");
const helmet = require("helmet");

// Middleware
const morgan = require("morgan");

const app = express();

// Secure your Express apps by setting various HTTP headers
app.use(helmet()); 

// Define trusted origins including local development URLs
const trustedOrigins = [
  'https://trusted.com',         // Production trusted domain
  'https://another-trusted.com', // Another production trusted domain
  'http://localhost:5173',       // Frontend development URL
  'http://localhost:5174'        // Another frontend development URL
];

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // or any request from a trusted origin
    if (!origin || trustedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // You can also specify other options such as allowed methods and headers
};

// Apply CORS middleware including the options
app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/roadRoutes", roadRouteRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

// Error Middleware
app.use(errorHandler);

connectDb().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});