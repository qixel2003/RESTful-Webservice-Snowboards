import jwt from "jsonwebtoken";

export default function requireAuth(req, res, next) {
    const authHeader = req.header("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        return next();
    } catch (e) {
        console.log("JWT VERIFY ERROR:", e.message);
        console.log("JWT_SECRET set?:", Boolean(process.env.JWT_SECRET));
        return res.status(401).json({
            message: "Invalid or expired token",
            error: e.message, // TIJDELIJK handig
        });
    }
}
