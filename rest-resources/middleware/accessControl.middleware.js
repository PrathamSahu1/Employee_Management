const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            console.log("req.user.role",req.user.role)
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
        next();
    };
};

export {checkRole}