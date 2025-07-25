const mongoose = require("mongoose");
const initData = require("./data");
const Listing=require("../models/listing");

const Mongo_URL = ('mongodb://127.0.0.1:27017/earthbnb');

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err)
})

async function main() {
    await mongoose.connect(Mongo_URL);
};

const initDB =async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initzd");
};
initDB();