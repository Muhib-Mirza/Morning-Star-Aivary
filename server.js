const express = require("express");
const app = express();
const blogRoute = require("./blogRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const mdb = `mongodb+srv://MuhammadMuhibMirza:black70flash@birdscard.b0pc58k.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mdb).then((result)=>{
    app.listen(3000 || process.env.PORT,()=>{
        console.log("Server Created");
    });
})
.catch((err)=>console.log(err));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


app.use(blogRoute);
