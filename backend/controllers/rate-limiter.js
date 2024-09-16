// controls/rate-limiter.js
const rateLimit = require('express-rate-limit');

module.exports = function(options) {
  return rateLimit({
    windowMs: options.lifetime * 1000, // Lifetime in milliseconds
    max: options.freeRetries, // Max number of allowed requests
    delayMs: 0, // Disable deprecated delay feature
    handler: (req, res) => {
      res.status(429).json({
        message: "Too many requests from this IP, please try again later",
      });
    },
    keyGenerator: (req /*, res*/) => {
      return req.ip;
    }
  });
};