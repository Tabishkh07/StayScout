const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

// for signup form
router.get("/signup", (req, res)=>{
    res.render("users/signup.ejs");
});

// for saving in signup data in database
router.post("/signup", wrapAsync(async(req,res)=>{
    try{
        let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registerdUser = await User.register(newUser, password);
    console.log(registerdUser);
    req.flash("success", "Welcome to StayScout");
    res.redirect("/listings");
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

// for login
router.get("/login", (req, res)=>{
    res.render("users/login.ejs");
});

// to check if user exits
router.post("/login", passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}),
    async(req, res)=>{
        res.send ("Welcome to StayScout! You are logged in!");
});

module.exports = router;
