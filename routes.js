const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Schema = require("./schema");
const user = require("./userSchema");
const bcrypt = require("bcryptjs");
const sharp = require("sharp");

multer({ dest: "upload"});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  
});

const upload = multer({ storage});

router.get("/", (req, res) => {
  res.render("main");
});

router.post("/signin", (req, res) => {
  user
    .findOne({
      email: req.body.email,
    })
    .then((result) => {
      bcrypt
        .compare(req.body.pass, result.pass)
        .then((result) => {
          if (result === true) {
              res.json({"message":"Success"});
          } else {
            res.json({"message":"Error"});
          }
        })
        .catch((err) => {
          res.send(err);
        });
    });
});

router.post("/adddata", upload.single("bimage"), async (req, res) => {
  if (!req.body) {
    res.send("Enter Correct Data");
  } else {
    const image = await sharp(`upload/${req.file.filename}`)
    .resize({width:910, height:414, fit:"contain"})
    .jpeg({quality:80})
    .toBuffer();
    const id = req.body.birdid;
    const name = req.body.birdname;
    const cost = req.body.birdcost;
    const udata = new Schema({
      birdid: id.toLowerCase(),
      birdname: name,
      birdcost: cost,
      image: {
        data: image,
        contentType:"img/jpeg"
      },
    });
    udata.save();
    res.send("Data Added");
  }
});

router.get("/alldata", (req, res) => {
  Schema.find().then((result) => {
    res.send(result);
  });
});

router.get("/:name", (req, res) => {
  const id = req.params.name;
  Schema.find({ birdid: id }).then((result) => {
    res.send(result);
  });
});

router.delete("/:id",(req,res)=>{
  Schema.findByIdAndDelete(id).then(result=>{
    console.log(result);
    if(result == true){
      res.send(true);
    }else{
      res.send(false);
    }
  }).catch(err=>{
    res.send(false);
    console.log(err);
  })
})

module.exports = router;