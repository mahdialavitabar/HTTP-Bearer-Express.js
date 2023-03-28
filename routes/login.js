const express = require("express");
const passport = require("passport");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Login" });
});

/* POST login page. */
router.post(
  "/",
  passport.authenticate("bearer", { session: false }),
  function (req, res) {
    // Successful authentication, redirect to protected content
    res.redirect("/protected");
  }
);

module.exports = router;
