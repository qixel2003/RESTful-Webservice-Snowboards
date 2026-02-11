import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body || {};

    const isEmpty = (v) => typeof v !== "string" || v.trim() === "";

    if (isEmpty(username) || isEmpty(password)) {
        return res.status(400).json({ message: "Missing credentials" });
    }
    //  check
    if (!username || !password) {
        return res.status(400).json({ message: "Missing credentials" });
    }

    // if (typeof username !== "string" || typeof password !== "string" || username.trim().length === 0 || password.trim().length === 0) {
    //     return res.status(400).json({ message: "Username and password are required" });
    // }

    if (username !== "admin" || password !== "admin") {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { username: "admin", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
        access_token: token,
        token_type: "Bearer",
        expires_in: process.env.JWT_EXPIRES_IN,
    });
});

export default router;
