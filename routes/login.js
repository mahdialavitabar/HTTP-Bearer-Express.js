const express = require("express");
const passport = require("passport");
const router = express.Router();

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
    res.redirect("/");
  }
);

module.exports = router;
