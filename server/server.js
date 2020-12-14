const express = require("express");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");

const app = express();
const port = 5000;
const MONGO_URI = "mongodb://localhost:27017/social_network";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    const init = require("./init");
    init.createGraphOfAllUser();
  })
  .catch((err) => console.log(err));

app.use(cors());

app.use(require("morgan")("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "./public/")));
// app.use(express.static(path.join(__dirname, "./public/profilePicture/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "A secret",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
require("./models/Users");
require("./models/Post");
require("./models/Follower");
require("./passport/setup");

app.use(require("./routes"));

app.listen(port, () => console.log("Server started"));
