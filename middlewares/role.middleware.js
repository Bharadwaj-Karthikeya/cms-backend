export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user role found"
            });
        }
        
        const userRole = req.user.role; // Assuming req.user is set by authMiddleware
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "Access denied: insufficient permissions"
            });
        }  
        
        next();
    }
}