module.exports = function isAdmin(options = {}) {
    return (req, res, next) => {
        if (req.user && req.user.role_id === 1) {
            return next();
        } else {
            const failureRedirect = options.failureRedirect || '/typing';
            return res.redirect(failureRedirect);
        }
    };
};