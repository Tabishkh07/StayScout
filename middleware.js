const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

// ==============================
// AUTH CHECK
// ==============================
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }
  next();
};

// ==============================
// SAVE REDIRECT URL
// ==============================
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// ==============================
// LISTING OWNER AUTHORIZATION
// ==============================
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (
    !res.locals.currUser ||
    listing.owner.toString() !== res.locals.currUser._id.toString()
  ) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// ==============================
// LISTING VALIDATION (JOI)
// ==============================
module.exports.validateListing = (req, res, next) => {
  if (!req.body.listing) {
    req.flash("error", "Invalid listing data");
    return res.redirect("/listings");
  }

  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// ==============================
// REVIEW VALIDATION (JOI)
// ==============================
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// ==============================
// REVIEW AUTHOR AUTHORIZATION
// ==============================
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  if (
    !res.locals.currUser ||
    review.author.toString() !== res.locals.currUser._id.toString()
  ) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
