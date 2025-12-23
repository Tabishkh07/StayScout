const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing.js");

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/stayscout");
}

app.get("/listing", async(req, res)=>{
    let sampleListing = new Listing({
        title: "This is my villa",
        description: "By thee Ocean Side",
        price: 1200, 
        location: "Calangute, Goa", 
        country: "India",
    });
    await sampleListing.save();
    console. log("sample was saved"); 
    res.send("successful testing");
});
    
app.get("/", (req, res)=>{
    res.send("hi am root");
});

let port = 8080;
app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});