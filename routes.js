const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Schema = require("./schema");

multer({dest:"upload"})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
});

const upload = multer({storage});

router.get("/",(req,res)=>{
    res.render("main");
});

router.post("/adddata", upload.single("bimage"),(req,res)=>{
    const udata = new Schema({
        birdid:req.body.birdid,
        birdname:req.body.birdname,
        birdcost:req.body.cost,
        image:{
            data:fs.readFileSync("upload/"+req.file.filename),
            contentType:String,
        }
    });
    udata.save();
    res.send(udata);
});

router.get("/alldata",(req,res)=>{
    Schema.find().then((result)=>{
        res.send(result);
    })
})

router.get("/:name",(req,res)=>{
    const id = req.params.name;
    Schema.find({birdid:id}).then((result)=>{
        res.send(result)
    })
})

module.exports = router;