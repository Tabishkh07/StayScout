const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ==============================
// IMAGE SUB-SCHEMA
// ==============================
const ImageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
});

// ==============================
// LISTING SCHEMA
// ==============================
const ListingSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    country: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: String,
      enum: [
        "trending",
        "rooms",
        "cities",
        "mountain",
        "castle",
        "pool",
        "camping",
        "farm",
        "arctic",
        "dome",
        "boat"
      ],
      required: true
    },

    image: {
      type: ImageSchema,
      required: true
    },

    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ],

    isTrending: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// ==============================
// CASCADE DELETE REVIEWS
// ==============================
ListingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await mongoose.model("Review").deleteMany({
      _id: { $in: doc.reviews }
    });
  }
});

// ==============================
// EXPORT MODEL
// ==============================
module.exports = mongoose.model("Listing", ListingSchema);
