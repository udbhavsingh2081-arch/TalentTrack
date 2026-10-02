const mongoose = require("mongoose");
const jobSchema=new mongoose.Schema({

    title:{
        type:String,
        required  : true,
    },
    description :{
        type:String,
        required: true
    },
    salary :{
        type:Number,
        required:true
    },
       company: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required:true,
    },
        companyLogo:{
        url:String,
        filename:String
    },
    recruiter:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
    },
    

});
const Job=mongoose.model ("Job",jobSchema);
module.exports=Job;