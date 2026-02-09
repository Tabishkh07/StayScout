const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/stayscout");
}

// initalize database
const initDb = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner:"697b89f0a4dcd584e2857302",}));
    await Listing.insertMany(initData.data);
    console.log("data was initilized");
};
initDb();
