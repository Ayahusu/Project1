const { validationResult } = require("express-validator")

const validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    next();
}

module.exports = validation