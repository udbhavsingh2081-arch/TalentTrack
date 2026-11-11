const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    college:String,
    degree:String,

    skills:String,
    github:String,
    linkedin:String,
    bio:String,

    graduationYear:Number,

    resume:{
    url:String,
    filename:String
},

   profileImage: {
    url: String,
    filename: String
},

    companyName:String,
    companyWebsite:String,
    companyLocation:String,
    designation:String,
    aboutCompany:String,

    role:{
        type:String,
        enum:["student","recruiter","admin"],
        default:"student"
    },
    cgpa: {
    type: Number,
    min: 0,
    max: 10
},

experience: {
    type: Number,
    min: 0,
    default: 0
},

preferredLocation: {
    type: String,
    trim: true
},

workMode: {
    type: String,
    enum: ["Onsite", "Remote", "Hybrid"],
    default: "Onsite"
},
    savedJobs:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }
],
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

const User = mongoose.model("User", userSchema);

module.exports = User;