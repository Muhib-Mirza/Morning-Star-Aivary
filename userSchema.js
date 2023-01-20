const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
    },
    pass:{
        type:String,
        require:true,
    }
});

const usermodel = mongoose.model("usermodel", userSchema);

module.exports = usermodel;