const Listing = require("../models/listing.js");
const fetch = require("node-fetch");

// index route
module.exports.index = async (req, res) => {
    let { q, category } = req.query;
    let filter = {};

    // 🔍 Search
    if (q) {
        filter.$or = [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ];
    }
    // 🔑 NORMALIZE CATEGORY
    if (category) {
        category = category.toLowerCase();   // ✅ IMPORTANT

        if (category === "trending") {
            filter.isTrending = true;        // price > 2000
        } else {
            filter.category = category;
        }
    }

    const allListing = await Listing.find(filter);
    res.render("listings/index.ejs", { allListing });
};


// new route
module.exports.renderNewForm = (req, res)=>{
    res.render("listings/new.ejs");
}

// show route
module.exports.showListing = async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
            path: "author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show", {listing});
};

// create route
module.exports.createListing = async (req, res, next) => {
    // 1️⃣ Image handling (unchanged)
    let url = req.file.path;
    let filename = req.file.filename;
    // 2️⃣ Create listing from form data
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    // 3️⃣ Get location text from form
    const location = req.body.listing.location;
    // 4️⃣ Call OpenStreetMap Nominatim API
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
        {
            headers: {
                "User-Agent": "StayScout-App"
            }
        }
    );
    const data = await response.json();
    // 5️⃣ Save geometry if location found
    if (data.length > 0) {
        newListing.geometry = {
            type: "Point",
            coordinates: [
                parseFloat(data[0].lon), // longitude
                parseFloat(data[0].lat)  // latitude
            ]
        };
    }
    // 6️⃣ Save listing
    console.log("GEOMETRY BEING SAVED:", newListing.geometry);
    await newListing.save();
    req.flash("success", "New List created!");
    res.redirect("/listings");
};


// edit route
module.exports.renderEditForm = async(req, res)=>{
    let {id} = req.params;
    const listings = await Listing.findById(id);
    if(!listings){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listings.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit", {listings, originalImageUrl});
};

// update route
module.exports.updateListing = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    
    req.flash("success", "List Updated!");
    res.redirect(`/listings/${id}`);
}

// delete route
module.exports.destroyListing = async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log (deletedListing);
    req.flash("success", "List deleted!");
    res.redirect("/listings");
};
