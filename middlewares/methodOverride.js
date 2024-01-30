module.exports = (paramName) => {
    return (req, res, next) => {
        if (paramName in req.query) {
            let queryMethod = req.query[paramName];

            req.originalMethod = req.method;
            req.method = queryMethod;
        }
        next();
    };
};

// This function takes a paramName
// After that it checks in req.query object for paramName
// And if it exists function will override the request method
