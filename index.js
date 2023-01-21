const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");
const cors = require("cors");
const env = require("dotenv").config();
const cookieParser = require("cookie-parser");

const mdb = `${process.env.MONGO_URL}`;

mongoose.connect(mdb).then(()=>{
    app.listen(4000,'localhost',()=>console.log("Server Created"));
});

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(router);