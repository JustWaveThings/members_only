const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});

module.exports = limiter;
