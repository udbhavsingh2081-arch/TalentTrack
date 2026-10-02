const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },

    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
},{
    timestamps:true
});
const Application=mongoose.model("Application",applicationSchema);

module.exports = Application;
