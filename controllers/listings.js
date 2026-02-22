const Listing = require("../models/listing.js");
const fetch = require("node-fetch");

// ==============================
// INDEX ROUTE
// ==============================
module.exports.index = async (req, res, next) => {
    try {
        let { q, category } = req.query;
        let filter = {};

        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
                { country: { $regex: q, $options: "i" } }
            ];
        }

        if (category) {
            category = category.toLowerCase();
            filter.category = category === "trending" ? undefined : category;
            if (category === "trending") filter.isTrending = true;
        }

        const allListing = await Listing.find(filter);
        return res.render("listings/index.ejs", { allListing });
    } catch (err) {
        return next(err);
    }
};

// ==============================
// NEW LISTING FORM
// ==============================
module.exports.renderNewForm = (req, res) => {
    return res.render("listings/new.ejs");
};

// ==============================
// SHOW LISTING
// ==============================
module.exports.showListing = async (req, res, next) => {
    try {
        const { id } = req.params;

        const listing = await Listing.findById(id)
            .populate("owner")
            .populate({
                path: "reviews",
                populate: { path: "author" }
            });

        if (!listing) {
            req.flash("error", "Listing you requested does not exist!");
            return res.redirect("/listings");
        }

        return res.render("listings/show", { listing });
    } catch (err) {
        return next(err);
    }
};

// ==============================
// CREATE LISTING
// ==============================
module.exports.createListing = async (req, res, next) => {
    try {
        const { location } = req.body.listing;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                location
            )}&limit=1`,
            { headers: { "User-Agent": "StayScout-App" } }
        );

        const data = await response.json();

        if (!data || data.length === 0) {
            req.flash("error", "Invalid location");
            return res.redirect("/listings/new");
        }

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        newListing.geometry = {
            type: "Point",
            coordinates: [
                parseFloat(data[0].lon),
                parseFloat(data[0].lat)
            ]
        };

        await newListing.save();
        req.flash("success", "New List created!");
        return res.redirect("/listings");
    } catch (err) {
        return next(err);
    }
};

// ==============================
// EDIT FORM
// ==============================
module.exports.renderEditForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        let originalImageUrl = listing.image.url.replace(
            "/upload",
            "/upload/h_300,w_250"
        );

        return res.render("listings/edit", { listing, originalImageUrl });
    } catch (err) {
        return next(err);
    }
};

// ==============================
// UPDATE LISTING
// ==============================
module.exports.updateListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        const newLocation = req.body.listing.location;

        if (newLocation !== listing.location) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    newLocation
                )}&limit=1`,
                { headers: { "User-Agent": "StayScout-App" } }
            );

            const data = await response.json();

            if (!data || data.length === 0) {
                req.flash("error", "Invalid location");
                return res.redirect(`/listings/${id}/edit`);
            }

            listing.geometry = {
                type: "Point",
                coordinates: [
                    parseFloat(data[0].lon),
                    parseFloat(data[0].lat)
                ]
            };
        }

        Object.assign(listing, req.body.listing);

        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        await listing.save();
        req.flash("success", "List Updated!");
        return res.redirect(`/listings/${id}`);
    } catch (err) {
        return next(err);
    }
};

// ==============================
// DELETE LISTING
// ==============================
module.exports.destroyListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "List deleted!");
        return res.redirect("/listings");
    } catch (err) {
        return next(err);
    }
};
