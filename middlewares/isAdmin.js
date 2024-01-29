const isAdmin = (options = {}) => {
    return (req, res, next) => {
        console.log(req.user)
        if (req.user && req.user.role === 'admin') {
            return next();
        } else {
            const failureRedirect = options.failureRedirect || '/login';
            return res.redirect(failureRedirect);
        }
    };
};