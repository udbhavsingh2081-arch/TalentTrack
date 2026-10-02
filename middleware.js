const User = require("./models/user");
const Job = require("./models/job");
const mongoose = require("mongoose");

const { jobSchema, userSchema } =
require("./schema");

module.exports.validateJob = (req,res,next)=>{

    const { error } =
    jobSchema.validate(req.body);

    if(error){

        let msg =
        error.details.map(
            el => el.message
        ).join(",");

        throw new Error(msg);
    }

    next();
};
module.exports.validateUser = (req,res,next)=>{

    console.log("VALIDATE USER HIT");
    console.log(req.body);

    const { error } =
    userSchema.validate(req.body);
if(error){

    req.flash(
        "error",
        error.details[0].message
    );

    return res.redirect(
        "/talenttrack/register"
    );
}
    next();
}


const { loginSchema,studentProfileSchema,recruiterProfileSchema } =
require("./schema");

module.exports.validateLogin =
(req,res,next)=>{

    let { error } =
    loginSchema.validate(req.body);

    if(error){

        throw new Error(
            error.details[0].message
        );
    }

    next();
};


module.exports.validateStudentProfile=(req,res,next)=>{

    let {error}=studentProfileSchema.validate(req.body);
    if(error){
        throw new Error( error.details[0].message);
    }
    next();
}


module.exports.validateRecruiterProfile = (req,res,next)=>{

      console.log("VALIDATE START");

    let { error } =
    recruiterProfileSchema.validate(req.body);

    if(error){
        console.log(error.details);

        throw new Error(
            error.details[0].message
        );
    }
   console.log("VALIDATE SUCCESS");
    next();
}

module.exports.isLoggedIn=(req,res,next)=>{

if(!req.isAuthenticated()){ 
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","Please login first!")
     return res.redirect("/talenttrack/login");}

next();
}

module.exports.isStudent = (req,res,next)=>{

    console.log(
    "isStudent hit:",
    req.originalUrl,
    "Role:",
    req.user?.role
);
 if(!req.user){
        return res.redirect("/talenttrack/login");
    }

    if(req.user.role !== "student"){
        req.flash("error","Only Students Allowed");
        return res.redirect("/talenttrack/jobs");
    }

    
    next();
}

module.exports.isRecruiter = (req,res,next)=>{

    console.log(
        "isRecruiter hit:",
        req.originalUrl,
        "Role:",
        req.user?.role
    );

    if(!req.user){
        req.flash("error","Please login first");
        return res.redirect("/talenttrack/login");
    }

    if(req.user.role !== "recruiter"){
        req.flash("error","Only Recruiters Allowed");
        return res.redirect("/talenttrack/jobs");
    }

    next();
};



module.exports.isJobOwner = async(req,res,next)=>{

    const { id } = req.params;

    const job = await Job.findById(id);

    if(!job){
        req.flash(
            "error",
            "Job Not Found"
        );

        return res.redirect(
            "/talenttrack/jobs"
        );
    }

    if(
        !job.recruiter.equals(req.user._id)
    ){

        req.flash(
            "error",
            "You Are Not Authorized"
        );

        return res.redirect(
            "/talenttrack/jobs"
        );
    }

    next();
};
module.exports.isApplicationOwner = async(req,res,next)=>{

    const application =
    await Application.findById(req.params.id)
    .populate("job");

    if(!application){

        req.flash(
            "error",
            "Application Not Found"
        );

        return res.redirect(
            "/talenttrack/recruiter/applications"
        );
    }

    if(
        !application.job.recruiter.equals(
            req.user._id
        )
    ){

        req.flash(
            "error",
            "You Are Not Authorized"
        );

        return res.redirect(
            "/talenttrack/recruiter/dashboard"
        );
    }

    next();
};




module.exports.validateObjectId = (req,res,next)=>{

    console.log("URL =", req.originalUrl);
    console.log("ID =", req.params.id);

    if(
        !mongoose.Types.ObjectId.isValid(req.params.id)
    ){
        req.flash("error","Invalid ID");

        return res.redirect("/talenttrack/jobs");
    }

    next();
};