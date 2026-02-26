const Listing = require("../models/listing.js");
const fetch = require("node-fetch");
const { cloudinary } = require("../cloudConfig.js");

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
      if (category === "trending") {
        filter.isTrending = true;
      } else {
        filter.category = category;
      }
    }

    const allListing = await Listing.find(filter);
    res.render("listings/index.ejs", { allListing });
  } catch (err) {
    next(err);
  }
};

// ==============================
// NEW LISTING FORM
// ==============================
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
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

    res.render("listings/show", { listing });
  } catch (err) {
    next(err);
  }
};

// ==============================
// CREATE LISTING
// ==============================
module.exports.createListing = async (req, res, next) => {
  try {
    if (!req.file) {
      req.flash("error", "Image is required");
      return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // Image
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };

    // 🌍 OPTIONAL geocoding
    try {
      const location = req.body.listing.location;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}&limit=1`,
        {
          headers: {
            "User-Agent": "StayScout-App (contact@stayscout.com)",
            "Accept": "application/json"
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          newListing.geometry = {
            type: "Point",
            coordinates: [
              parseFloat(data[0].lon),
              parseFloat(data[0].lat)
            ]
          };
        }
      }
    } catch (err) {
      // 🔕 silently ignore geocoding errors
    }

    // ✅ ALWAYS SAVE LISTING
    await newListing.save();

    req.flash(
      "success",
      newListing.geometry
        ? "New listing created!"
        : "Listing created, but location could not be mapped."
    );

    res.redirect("/listings");

  } catch (err) {
    next(err);
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

    const originalImageUrl = listing.image.url.replace(
      "/upload",
      "/upload/h_300,w_250"
    );

    res.render("listings/edit", { listing, originalImageUrl });
  } catch (err) {
    next(err);
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
        {
          headers: {
            "User-Agent": "StayScout-App (contact@stayscout.com)",
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) {
  if (response.status === 429) {
    req.flash(
      "error",
      "Too many requests. Please wait a minute and try again."
    );
    return res.redirect(`/listings/${id}/edit`);
  }

  req.flash("error", "Unable to update location. Please try again later.");
  return res.redirect(`/listings/${id}/edit`);
}

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

    // ☁️ Cloudinary cleanup
    if (req.file) {
      if (listing.image && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
      }

      listing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    await listing.save();
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};

// ==============================
// DELETE LISTING
// ==============================
module.exports.destroyListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};
