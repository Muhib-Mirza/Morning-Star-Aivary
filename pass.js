const mongoose = require("mongoose");
const schema=mongoose.Schema;

const blog = new schema({
    email:{
        type:String,
    },
    password:{
        type:String,
        
    }
})

const ID = mongoose.model('ID', blog);
module.exports = ID;