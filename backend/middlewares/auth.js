import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    try {
        const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: "Invalid token" });
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}