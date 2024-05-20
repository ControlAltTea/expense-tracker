// passport-jwt-strategy.js
const prisma = require("./db/prismaClient");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Extract JWT from the Authorization header

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "process.env.SECRET_KEY",
};

// Configure Passport to use JWT strategy
passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: jwtPayload.id,
        },
        select: {
          id: true,
        },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
