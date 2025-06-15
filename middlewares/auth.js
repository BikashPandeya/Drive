const jwt = require("jsonwebtoken");

function auth(req , res ,next) {
    const token = req.cookies.token; 
    if (!token) {
         // Redirect to login if no token
        return res.redirect("/user/login");
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        return next(); // Call next middleware or route handler
    } catch (err) {
         return res.status(401).json({ message: "Unauthorized access" });
    }
}

module.exports = auth;