const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Schema = require("./schema");
const jwt = require("jsonwebtoken");
const user = require("./userSchema");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

multer({ dest: "upload"});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  
});
const maxSize = 3*1024*1024;
const upload = multer({ storage,
  fileFilter:(req,file,cb)=>{
    if(file.mimetype == "img/png" || file.mimetype == "img/jpg" || file.mimetype == "img/svg" || file.mimetype == "img/jpeg"){
      cb(null, true);
    }else{
      cb(null, false);
      return cb(new Error("Please Enter Image"));
    }
  },
  limits:{
    fileSize: maxSize
  }
 });

router.get("/", (req, res) => {
  res.render("main");
});

// router.post("/register", (req, res) => {
//   bcrypt.hash(req.body.pass, salt).then((result) => {
//     const userdata = new user({
//       email: req.body.email,
//       pass: result,
//     });
//     userdata.save();
//   });
// });

// router.get("/getcookie", (req, res) => {  
//     if(!req.cookies.jwt){
//         res.json({"message":"Please Signin Again"})
//     }
//     else{
//         let token = req.cookies.jwt;
//         let result = jwt.verify(token, "HelloIAmTheSecretKeyOfTheJsonWebToken");
//         if(result === true)
//         {
//             res.json({"message":"Success"});
//         }
//         else{
//             res.json({"message":"Failed"});
//         }
//     }
//     next();
// });

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
            // const token = jwt.sign(
            //     { email: req.body.email },
            //     "HelloIAmTheSecretKeyOfTheJsonWebToken",
            //     { expiresIn: "7d" }
            //   );
            //   res.cookie("jwt", token, {
            //     httpOnly: true,
            //     expires: new Date(Date.now() + 604800000),
            //   });
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

router.post("/adddata", upload.single("bimage"), (req, res) => {
  if (!req.body) {
    res.send("Enter Correct Data");
  } else {
    const id = req.body.birdid;
    const name = req.body.birdname;
    const cost = req.body.birdcost;
    const udata = new Schema({
      birdid: id,
      birdname: name,
      birdcost: cost,
      image: {
        data: fs.readFileSync("upload/" + req.file.filename,"base64"),
        contentType:`${req.file.mimetype}`
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

module.exports = router;
