import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import prisma from "./utils/prisma.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value.toLowerCase();
                let user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email },
                            { providerId: profile.id }
                        ]
                    }
                });
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: profile.displayName,
                            email,
                            provider: "gmail",
                            providerId: profile.id,
                        }
                    });
                } else if (!user.providerId) {
                    user = await prisma.user.update({
                        where: { email: user.email },
                        data: { providerId: profile.id, provider: "gmail" }
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
            callbackURL: "http://localhost:3000/auth/github/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value.toLowerCase();
                let user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email },
                            { providerId: profile.id }
                        ]
                    }
                });
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: profile.displayName,
                            email,
                            provider: "github",
                            providerId: profile.id,
                        }
                    });
                } else if (!user.providerId) {
                    user = await prisma.user.update({
                        where: { email: user.email },
                        data: { providerId: profile.id, provider: "gmail" }
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;