import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import prisma from "./utils/prisma.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                let user = await prisma.user.findUnique({ where: { providerId: profile.id } });
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            provider: "gmail",
                            providerId: profile.id,
                        }
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                let user = await prisma.user.findUnique({ where: { providerId: profile.id } });
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            provider: "github",
                            providerId: profile.id,
                        }
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;