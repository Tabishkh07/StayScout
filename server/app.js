const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

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

// index route
app.get("/listings", async(req, res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", {allListing});
});

// new route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new");
});

// show route
app.get("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing});
});

// create route
app.post("/listings", async(req, res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
});

// edit route
app.get("/listings/:id/edit", async(req, res)=>{
    let {id} = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/edit", {listings});
});

// update route
app.put("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// delete route
app.delete("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log (deletedListing);
    res.redirect("/listings");
});

let port = 8080;
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});
