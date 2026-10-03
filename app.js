const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dbUrl = process.env.ATLASDB_URL;

const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride = require("method-override");
require("dotenv").config();
console.log("Cloud Name =", process.env.CLOUD_NAME);


app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require("express-session");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const flash = require("connect-flash");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
const User = require("./models/user");


app.use(
    session({
        secret: "talenttracksecret",
        resave: false,
        saveUninitialized: false
    })
);
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;

    console.log("USER =", req.user);

    next();
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        User.authenticate()
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const { isLoggedIn,isRecruiter,isStudent,isApplicationOwner } = require("./middleware.js");



main()
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

app.use((req,res,next)=>{
    console.log(req.method, req.url);
    next();
});

const userRoutes =
require("./routes/userroute");

const jobRoutes =
require("./routes/jobroute");

app.use(
    "/talenttrack",
    userRoutes
);

app.use(
    "/talenttrack/jobs",
    jobRoutes
);


app.use((err,req,res,next)=>{

    if(err.code === "LIMIT_FILE_SIZE"){

        // req.flash(
        //     "error",
        //     "File size exceeds limit"
        // );
           console.log("ACTUAL ERROR =", err);

    req.flash(
        "error",
        err.message || "Something went wrong"
    );
       return res.redirect("/talenttrack/profile");
    }

    if(err.message){

        req.flash(
            "error",
            err.message
        );

       return res.redirect("/talenttrack/profile");
    }

    next(err);
});

app.get("/",(req,res)=>{
    res.send("succesful start");
    console.log(isLoggedIn);
console.log(isRecruiter);
console.log(isStudent);
});
app.get("/talenttrack",(req,res)=>{
    res.render("home.ejs");
});

app.get("/me",(req,res)=>{
    console.log("SESSION:",req.session);
    console.log("USER:",req.user);

    res.send({
        authenticated:req.isAuthenticated(),
        user:req.user
    });
});




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Start on ${port}`);
});
