const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// ================= CREATE REVIEW =================
module.exports.createReview = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        const newReview = new Review(req.body.review);
        newReview.author = req.user._id;

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success", "New Review Created!");
        return res.redirect(`/listings/${listing._id}`);

    } catch (err) {
        return next(err);
    }
};

// ================= DELETE REVIEW =================
module.exports.destroyReview = async (req, res, next) => {
    try {
        const { id, reviewId } = req.params;

        await Listing.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId },
        });

        await Review.findByIdAndDelete(reviewId);

        req.flash("success", "Review Deleted!");
        return res.redirect(`/listings/${id}`);

    } catch (err) {
        return next(err);
    }
};
