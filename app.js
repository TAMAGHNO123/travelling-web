const express = require("express");
const app = express();
const mongoose = require("mongoose");
const place = require("./models/place.js");
const path = require("path");
const methodOverride = require("method-override");
const expressLayouts = require('express-ejs-layouts');

const MONGO_URL = "mongodb://127.0.0.1:27017/Hotel";

main().then(() => {
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/boilerplate'); // Default layout
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.render('index', { title: 'Home Page' });
});

//index route
app.get("/place", async (req, res) => {
    const allPlace = await place.find({});
    res.render("places/index", { allPlace })
})

//New route
app.get("/place/new", (req, res) => {
    res.render("places/new")
});

//show route
app.get("/place/:id", async (req, res) => {
    let { id } = req.params;
    const place3 = await place.findById(id);
    res.render("places/show", { place3 })
})

//create route 
app.post("/place", async (req, res) => {
    const newPlace = new place(req.body.place);
    await newPlace.save();
    res.redirect("/place")
})

//edit route
app.get("/place/:id/edit", async (req, res) => {
    let { id } = req.params;
    const place4 = await place.findById(id);
    res.render("places/edit", { place4 })
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
app.delete("/place/:id", async (req, res) => {
    let { id } = req.params;
    await place.findByIdAndDelete(id);
    res.redirect("/place")
})
app.get('/places', async (req, res) => {
    const allPlace = await place.find({});
    res.render('places/index', { allPlace });
});
app.listen(8080, () => {
    console.log("Server running on port 8080")
});