const express = require("express");
const router = express.Router();
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

// compact way
router
    .route("/signup")
    .get(userController.renderSignupForm)   // for signup form
    .post(userController.signup);    // for saving in signup data in database

router
    .route("/login")
    .get(userController.renderLoginForm)    // for login
    .post(saveRedirectUrl,    // to check if user exits
    passport.authenticate("local", 
        {failureRedirect: '/login', 
            failureFlash: true
        }),
    userController.login
);

// logout route
router.get("/logout", userController.logout);

module.exports = router;
