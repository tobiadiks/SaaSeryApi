var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv").config();
var mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser"); 
const session = require("express-session");
const LocalStrategy = require("passport-local");


let User = require('./models/User');

app = express();

const uri = process.env.DB_CONNECT;
const um = "mongodb://127.0.0.1:27017/local";
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(cookieParser("123 - 456 - 789"));
app.use(
  session({
    name: "session-id",
    secret: "123 - 456 - 789",
    saveUninitialized: true,
    resave: true,
   // cookie:{secure:true},
   sameSite: false, // i think this is default to false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(um, { useNewUrlParser: true, useCreateIndex: true }); //connecting database;

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDb database connection established successfully");
}); //event listening for an opened connection

const userRoute = require("./routes/users");
const softwareRoute = require("./routes/software");
const { options } = require("./routes/users");

app.use("/u", userRoute);
app.use("/app", softwareRoute);

const clientId = process.env.C_ID;
const clientSecret = process.env.C_SECRET;

app.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
}); //callback url

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
