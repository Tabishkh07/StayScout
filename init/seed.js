if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const dbUrl = process.env.ATLASDB_URL;
async function seedDB() {
    try {
        // 1️⃣ CONNECT FIRST
        await mongoose.connect(dbUrl);
        console.log("connected to ATLAS");

        // 2️⃣ THEN run DB operations
        await Listing.deleteMany({});

        const data = initData.data.map(obj => ({
            ...obj,
            owner: "697b89f0a4dcd584e2857302",
        }));

        await Listing.insertMany(data);
        console.log("data was initialized");

    } catch (err) {
        console.error("SEED ERROR:", err);
    } finally {
        // 3️⃣ ALWAYS close connection
        await mongoose.connection.close();
        console.log("connection closed");
    }
}
\
seedDB();
