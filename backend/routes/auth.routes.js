import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../passport.js";
import { login, register } from "../controllers/auth.controllers.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "cnaosixfm,.qwexfmqnyc7236@^%r3X.FASUYDG";

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173" }),
    (req, res) => {
        const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.redirect(`http://localhost:5173/?token=${token}`);
    }
);

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/auth/github/callback",
    passport.authenticate("github", { session: false, failureRedirect: "http://localhost:5173" }),
    (req, res) => {
        const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.redirect(`http://localhost:5173/?token=${token}`);
    }
);

export default router;