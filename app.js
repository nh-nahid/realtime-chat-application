const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

dotenv.config();

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("database onnection successful!"))
.catch(err => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.listen(3000, () => {
    console.log("app is listening at port 3000");
})