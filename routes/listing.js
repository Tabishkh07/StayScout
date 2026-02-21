const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require ('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer ({storage});

// compact way of writing same routes
router
    .route("/")
    .get (wrapAsync (listingController. index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );
    
// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);    // if below id then confusion in id and new

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing)) // show route
    .put(isLoggedIn,
        isOwner, 
        upload.single("listing[image]"),
        validateListing,  
        wrapAsync(listingController.updateListing)) // update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));  // delete route

// edit route
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;
