const mongoose = require ("mongoose");
const Schema =mongoose.Schema;

const listingSchema =new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image: {
        filename: {
            type: String,
            default: "defaultfilename"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1612139861700-556daf8c95be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) =>
            v === ""
            ? "https://images.unsplash.com/photo-1612139861700-556daf8c95be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            : v,
        },
    },
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports =Listing;