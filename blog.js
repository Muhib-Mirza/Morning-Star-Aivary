const mongoose = require("mongoose");

const schema =mongoose.Schema;

const blog = new schema({
    birdId:{
        type:String,
        require: true,
    },
    birdName:{
        type: String,
        require: true,
    },
    birdPrice:{
        type:Number,
        require:true,
    },
    birdGender:{
        type:String,
        require:true
    },
    birdImage:{
        type:String,
        require:true,
    },
})

const birdCard = mongoose.model('bordCard', blog);

module.exports = birdCard;