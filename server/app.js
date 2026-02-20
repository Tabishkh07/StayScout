if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

// authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/users.js");

const dburl = process.env.ATLASDB_URL;

//  MONGOOSE 
mongoose.set("strictQuery", false);

async function main() {
    await mongoose.connect(dburl);
}

main()
    .then(() => console.log("connected to db"))
    .catch(err => console.log(err));

// ================== APP CONFIG ==================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ================== SESSION STORE ==================
const store = MongoStore.create({
    mongoUrl: dburl,
    dbName: "stayscout",
});

store.on("error", err => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// ================== PASSPORT ==================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================== LOCALS ==================
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user || null;
    next();
});

// ================== ROUTES ==================
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ================== 404 ==================
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// ================== ERROR HANDLER ==================
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const { statusCode = 500, message = "Something went wrong!!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// ================== SERVER ==================
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
