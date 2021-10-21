const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

const app = express();

mongoose.connect('mongodb://localhost:27017/BeWild', {useNewUrlParser: true, useUnifiedTopology: true});

// 사용하는 엔진이 있는 디렉토리 설정 ("views" 폴더 안의 ejs 파일 사용)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// css file 적용
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true}));     // body-parsing
app.use(methodOverride("_method"));     // app.put , app.delete를 쓰기 위해


// Session
const sessionConfig = {
    secret: "thisshouldbeagoodsecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));


// Flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);


/* Routes */

app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statusCode).render("error", {err});
});


app.listen(3000, () => {
    console.log("Serving on port 3000.");
});