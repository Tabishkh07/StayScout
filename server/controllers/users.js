const User = require("../models/user.js");

// for signup form
module.exports.renderSignupForm = (req, res,next)=>{
    res.render("users/signup.ejs");
};

// for saving in signup data in database
module.exports.signup = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registerdUser = await User.register(newUser, password);
        console.log(registerdUser);
        // automatic login.
        req.login(registerdUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to StayScout");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

// for login
module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
}

// check if user exits
module.exports.login = async(req, res)=>{
    req. flash("success", "Welcome back to StayScout!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res. redirect(redirectUrl);
};

// logout route
module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out!!");
        res.redirect("/listings");
    });
}
