const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js")

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/stayscout");
}

// app.get("/listing", async(req, res)=>{
//     let sampleListing = new Listing({
//         title: "This is my villa",
//         description: "By thee Ocean Side",
//         price: 1200, 
//         location: "Calangute, Goa", 
//         country: "India",
//     });
//     await sampleListing.save();
//     console. log("sample was saved"); 
//     res.send("successful testing");
// });
    
app.get("/", (req, res)=>{
    res.send("hi am root");
});

// middleware for joi error handling
const validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

// index route
app.get("/listings", 
    wrapAsync(async(req, res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", {allListing});
}));

// new route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new");
});

// show route
app.get("/listings/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing});
}));

// create route
app.post("/listings",
    validateListing,
    wrapAsync(async(req, res, next)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// edit route
app.get("/listings/:id/edit", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/edit", {listings});
}));

// update route
app.put("/listings/:id",
    validateListing, 
    wrapAsync(async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

// delete route
app.delete("/listings/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log (deletedListing);
    res.redirect("/listings");
}));

// for url which dosent exist
app.use((req, res, next)=>{
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next)=>{
    let {statusCode=500, message = "Something went wrong!!"} = err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
});

let port = 8080;
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});
