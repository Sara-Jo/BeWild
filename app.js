const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const Campground = require("./models/campground");

const app = express();


// 사용하는 엔진이 있는 디렉토리 설정 ("views" 폴더 안의 ejs 파일 사용)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// css file 적용
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true}));     // body-parsing
app.use(methodOverride("_method"));     // app.put , app.delete를 쓰기 위해



mongoose.connect('mongodb://localhost:27017/BeWild', {useNewUrlParser: true, useUnifiedTopology: true});



/* Routes */

app.get("/", (req, res) => {
    res.render("home");
});

// Read
app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/campgrounds", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

// Create
app.post("/campgrounds", async(req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get("/campgrounds/:id", async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
});

// Update
app.put("/campgrounds/:id", async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

// Delete
app.delete("/campgrounds/:id", async(req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
});


app.listen(3000, () => {
    console.log("Serving on port 3000.");
});