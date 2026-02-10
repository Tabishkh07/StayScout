const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// compact way of writing same routes
router
    .route("/")
    .get(wrapAsync(listingController.index))   // index route
    .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));  //create route
    
// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);    // if below id then confusion in id and new

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing)) // show route
    .put(isLoggedIn, validateListing, isOwner, wrapAsync(listingController.updateListing)) // update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));  // delete route

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
