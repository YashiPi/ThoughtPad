import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // most of the times, you will put user id or ip address as the key, so that only particular user is blocked/rate limited not everyone

    // const userId = req.user ? req.user.id : "anonymous";
    const key = `rate-limit:${req.ip}`;
    const { success } = await ratelimit.limit(key);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    // If the request is allowed, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Rate limiter error:", error);
    next(error); // Pass the error to the next middleware
  }
  //   const ip = req.ip; // Get the IP address of the client
  //   const currentTime = Date.now(); // Get the current timestamp

  //   // Initialize or update the request count for this IP
  //   if (!req.app.locals.rateLimit) {
  //     req.app.locals.rateLimit = {};
  //   }

  //   if (!req.app.locals.rateLimit[ip]) {
  //     req.app.locals.rateLimit[ip] = { count: 0, lastRequestTime: currentTime };
  //   }

  //   const rateLimitData = req.app.locals.rateLimit[ip];

  //   // Check if the time since the last request exceeds the limit
  //   if (currentTime - rateLimitData.lastRequestTime > 60000) {
  //     // Reset every minute
  //     rateLimitData.count = 0;
  //     rateLimitData.lastRequestTime = currentTime;
  //   }

  //   // Increment the request count
  //   rateLimitData.count++;

  //   // Check if the request count exceeds the limit
  //   if (rateLimitData.count > 100) {
  //     // Limit to 100 requests per minute
  //     return res
  //       .status(429)
  //       .json({ message: "Too many requests, please try again later." });
  //   }

  //   next(); // Proceed to the next middleware or route handler
};

export default rateLimiter;
