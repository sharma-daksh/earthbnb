const express =require ('express');
const app = express();
const mongoose = require('mongoose');
const Listing =require('./models/listing');
const path =require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Mongo_URL = ('mongodb://127.0.0.1:27017/earthbnb');



main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err)
})

async function main() {
    await mongoose.connect(Mongo_URL);
};

app.engine('ejs', ejsMate);
app.set("view engine","ejs");
app.set("views",path.join (__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("working k g a")
})
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});
app.get("/listings/new",async (req,res)=>{
    res.render("./listings/new.ejs");
});
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
});

app.post("/listings",async (req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
})

app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

// app.get("/testListing", async (req,res)=>{
//     let sampleTesting=new Listing({
//         title:"My home",
//         description:"By the river",
//         price:"12000",
//         location:"Landmannalaugar",
//         country:"Iceland",
//     });
//     await sampleTesting.save();
//     console.log("Sample was saved");
//     res.send("Successfully testing");
// })


app.listen(3002, () => {
    console.log('Server is running on port 3002');
});




