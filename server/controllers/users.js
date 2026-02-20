const User = require("../models/user.js");

// ================= SIGNUP FORM =================
module.exports.renderSignupForm = (req, res) => {
    return res.render("users/signup.ejs");
};

// ================= SIGNUP =================
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // auto login
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // ✅ safe
            }
            req.flash("success", "Welcome to StayScout");
            return res.redirect("/listings"); // ✅ RETURN
        });

    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/signup"); // ✅ RETURN
    }
};

// ================= LOGIN FORM =================
module.exports.renderLoginForm = (req, res) => {
    return res.render("users/login.ejs");
};

// ================= LOGIN =================
module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to StayScout!!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    return res.redirect(redirectUrl); // ✅ RETURN
};

// ================= LOGOUT =================
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!!");
        return res.redirect("/listings"); // ✅ RETURN
    });
};
