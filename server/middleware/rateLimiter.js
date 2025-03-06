const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: "To many action. Try again later"
})

module.exports = limiter