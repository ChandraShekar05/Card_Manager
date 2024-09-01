const authenticationMiddleware = (req, res, next) => {
    // Debugging line
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    req.user = req.session.user; // Set user info
    next();
};

module.exports = authenticationMiddleware;
