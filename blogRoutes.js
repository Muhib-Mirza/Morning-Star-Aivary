const express = require("express");
const router = express.Router();
const Blog = require("./blog");
const pass = require("./pass");
const multer = require("multer");
// const ID = require("./pass");

multer({
    dest: 'public/'
})

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
},
)

const upload = multer({
    storage: storage
})

// const password = new pass({
//     email:'mirzamuhib8@gmail.com',
//     password:'black70flash',
// });
// password.save().catch((err)=>{
//     console.log(err);
// })

router.get('/',(req,res)=>{
    res.render('index');
});

router.get('/index',(req,res)=>{
    res.redirect('/');
})

router.get('/Albino_Black',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Albino_Black', {
            blogs:result,
        })
    })
});

router.get('/Albino_Red', (req,res)=>{
    Blog.find().then((result)=>{
        res.render('Albino_Red', {blogs:result})
    })
})

router.get('/Blue_Euwing',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Blue_Euwing' , {blogs:result})
    })
})
router.get('/Blue_Opaline', (req,res)=>{
    Blog.find().then((result)=>{
        res.render('Blue_Opaline', {blogs:result})
    })
})
router.get('/Cremino',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Cremino', {blogs:result})
    })
})
router.get('/Fisher',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Fisher', {blogs:result})
    })
})
router.get('/Green_Euwing_blue',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Green_Euwing_blue', {blogs:result})
    })
})
router.get('/Green_Euwing',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Green_Euwing', {blogs:result})
    })
})
router.get('/Green_Opaline',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Green_Opaline', {blogs:result})
    })
})
router.get('/Green_Opaline_Blue',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Green_Opaline_Blue', {blogs:result})
    })
})
router.get('/Green_Parblue',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Green_Parblue', {blogs:result})
    })
})
router.get('/Parblue_Opaline',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Parblue_Opaline', {blogs:result})
    })
})
router.get('/Parblue',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Parblue', {blogs:result})
    })
})
router.get('/Pastle',(req,res)=>{
    Blog.find().then((result)=>{
        res.render('Pastle', {blogs:result})
    })
})

router.get('/add-data', (req,res)=>{
    res.render('addData');
})

router.post('/add-card', upload.single('birdImage') ,(req,res)=>{
    const userdata = new Blog({
        birdId:req.body.birdId,
        birdName:req.body.birdName,
        birdPrice:req.body.birdPrice,
        birdImage:req.file.originalname,
        birdGender:req.body.birdGender,
    })
    userdata.save().then((result)=>res.redirect('/')).catch((err)=>console.log(err));
    
})
router.use((req,res)=>{
    res.status(404).render('404');
})

module.exports = router;