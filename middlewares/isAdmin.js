module.exports = function isAdmin(options = {}) {
    return (req, res, next) => {
        if (req.user && req.user.roleId === 1) {
            return next();
        } else {
            const failureRedirect = options.failureRedirect || '/typing';
            return res.redirect(failureRedirect);
        }
    };
};