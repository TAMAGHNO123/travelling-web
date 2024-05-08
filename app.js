const express = require("express");
const app = express();
const mongoose = require("mongoose");
const place=require("./models/place.js")
const path =require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");



const MONGO_URL="mongodb://127.0.0.1:27017/Hotel";

main().then(()=>{
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);

}

app.engine("ejs",ejsMate)
app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("hii , mai root hu");
});
//index route
app.get("/place",async(req,res)=>{
    const allPlace = await place.find({});
    res.render("places/index.ejs",{allPlace})
})
//New route
app.get("/place/new",(req,res)=>{
    res.render("places/new.ejs")
});

//show route
app.get("/place/:id",async(req,res)=>{
    let {id}= req.params;
    const place3= await place.findById(id);
    res.render("places/show.ejs",{place3})
})

//create route 
app.post("/place",async(req,res)=>{
    const newPlace=new place(req.body.place);
    await newPlace.save();
    res.redirect("/place")
})

//edit route

app.get("/place/:id/edit",async(req,res)=>{
    let {id}= req.params;
    const place4 = await place.findById(id);
    res.render("places/edit.ejs",{place4})
})

app.put("/place/:id", async (req, res) => {
    try {
        let { id } = req.params;
        await place.findByIdAndUpdate(id, { ...req.body.place });
        console.log("Place updated successfully!");
        res.redirect(`/place/${id}`);
    } catch (error) {
        console.error("Error updating place:", error);
        res.status(500).send("Error updating place");
    }
});
//delete route

app.delete("/place/:id",async(req,res)=>{
    let {id} = req.params;
    const place6=await place.findByIdAndDelete(id);
   console.log(place6)
    res.redirect("/place")
})


app.listen(8080,()=>{
    console.log("hmara server 8080 chl gya h")
});

