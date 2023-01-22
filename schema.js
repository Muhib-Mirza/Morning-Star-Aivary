const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    birdid:{
        type:String,
        require:true,
    },
    birdname:{
        type:String,
        require:true
    },
    birdcost:{
        type:String,
        require:true
    },
    image:{
        data:Buffer,
        contentType:String,
    }
});

const imageModel = mongoose.model("imageModel",imageSchema);

module.exports = imageModel;