import { Router } from "express";
import passport from "../passport.js";
import { login, register } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: req.user });
    }
);

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
        const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: req.user });
    }
);

export default router;