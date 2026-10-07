const User = require("../models/user");
const Application = require("../models/application");
const Job = require ("../models/job");
const resend = require("../utilis/mailer");
const ExpressError = require("../utilis/expressError");
const ai = require("../utilis/gemini");

//Home Page
module.exports.index=(req,res)=>{
    res.render("home.ejs");
};


//Register
module.exports.Registerpage = (req, res) => {
    res.render("Users/register");
};

module.exports.Register = async (req, res, next) => {

    console.log("REGISTER HIT");
    console.log(req.body);

    try {

        const { name, email, role, password } = req.body;

        const newUser = new User({
            name,
            email,
            role
        });

        console.log("BEFORE REGISTER");

        const registeredUser =
        await User.register(
            newUser,
            password
        );

        console.log("AFTER REGISTER");
        console.log(registeredUser);

        req.login(registeredUser, (err) => {

            if (err) {
                console.log("LOGIN ERROR", err);
                return next(err);
            }

            console.log("AUTO LOGIN SUCCESS");

            res.redirect("/talenttrack/jobs");
        });

    } catch (err) {

        console.log("REGISTER ERROR");
        console.log(err);

        req.flash("error", err.message);

        res.redirect("/talenttrack/register");
    }
};

//login

module.exports.loginPage=(req,res)=>{

    res.render("Users/login");
};

module.exports.login = async(req,res)=>{

    try{

        await resend.emails.send({

            from: "onboarding@resend.dev",

            to: req.user.email,

            subject: "Login Alert - TalentTrack",

            html: `
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e5e7eb; border-radius:12px;">

                <div style="text-align:center; padding-bottom:20px;">
                    <h1 style="color:#2170e4; margin:0;">
                        TalentTrack
                    </h1>

                    <p style="color:#6b7280;">
                        Career & Recruitment Platform
                    </p>
                </div>

                <h2>
                    Hello ${req.user.name},
                </h2>

                <p>
                    We noticed a successful login to your TalentTrack account.
                </p>

                <div style="background:#f8fafc; padding:15px; border-radius:10px; margin:20px 0;">
                    <p>
                        <strong>Email:</strong>
                        ${req.user.email}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        Login Successful
                    </p>
                </div>

                <p>
                    If this was you, no action is required.
                </p>

                <p>
                    If you did not log in, please reset your password immediately and secure your account.
                </p>

                <div style="text-align:center; margin-top:30px;">

                    <a
                        href="https://talenttrack-xsib.onrender.com"
                        style="
                            background:#2170e4;
                            color:white;
                            padding:12px 24px;
                            text-decoration:none;
                            border-radius:8px;
                            display:inline-block;
                        "
                    >
                        Visit TalentTrack
                    </a>

                </div>

                <hr style="margin-top:30px;">

                <p style="color:#6b7280; font-size:14px; text-align:center;">
                    © 2026 TalentTrack. All Rights Reserved.
                </p>

            </div>
            `
        });

        console.log("Email Sent");

    }catch(err){

        console.log("Email Error:",err);

    }

    req.flash(
        "success",
        "Welcome Back To TalentTrack"
    );

    res.redirect("/talenttrack/jobs");
};

//LogOut
module.exports.logOut = (req,res,next)=>{

    req.logout(function(err){

        if(err){
            return next(err);
        }

        req.flash(
            "success",
            "Logged Out Successfully"
        );

        res.redirect("/talenttrack/jobs");
    });

};

//job table
module.exports.jobTable=async(req,res)=>{

        const jobs = await Job.find({
            recruiter: req.user._id
        });

        res.render("recruiter/jobTable", { jobs });
    };

    //Application Table
    module.exports.applicationTableRecruiter= async (req,res)=>{

        const jobs = await Job.find({
            recruiter: req.user._id
        });

        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({
            job: { $in: jobIds }
        })
        .populate("student")
        .populate("job");

        res.render(
            "recruiter/applicationTable",
            { applications }
        );
    };

    //accept Application
    module.exports.acceptApplication= async(req,res)=>{

        await Application.findByIdAndUpdate(
            req.params.id,
            { status: "Accepted" }
        );

        res.redirect(
            "/talenttrack/recruiter/applications"
        );
    };

    //reject appplication
    module.exports.rejectApplication= async(req,res)=>{

        await Application.findByIdAndUpdate(
            req.params.id,
            { status: "Rejected" }
        );

        res.redirect(
            "/talenttrack/recruiter/applications"
        );
    };

    //Recuiter Prolfie show 
    module.exports.recruiterProfile= async(req,res)=>{

        const recruiter =
        await User.findById(req.params.id);
      if(!recruiter){
    throw new ExpressError(
        404,
        "Recruiter Not Found"
    );
}
           const totalJobs =
        await Job.countDocuments({
            recruiter: recruiter._id
        });


        res.render(
            "recruiter/profile",
            { recruiter,totalJobs }
        );
    };

    module.exports.recruiterOwnProfile = async(req,res)=>{

    const recruiter =
    await User.findById(req.user._id);
        if(!recruiter){
    throw new ExpressError(
        404,
        "Recruiter Not Found"
    );
}
    const totalJobs =
    await Job.countDocuments({
        recruiter: recruiter._id
    });

    res.render(
        "recruiter/profile",
        { recruiter,totalJobs }
    );
};

    //Edit recruiter profile 
    module.exports.recruiterProfileEditPage=    async(req,res)=>{

        const recruiter =
        await User.findById(req.user._id);
          if(!recruiter){
        throw new ExpressError(
            404,
            "Recruiter Not Found"
        );
    }

        res.render(
            "recruiter/profileEdit",
            { recruiter }
        );
    };

module.exports.recruiterProfileEdit = async (req, res) => {

    const recruiter = await User.findById(req.user._id);



    if (!recruiter) {
        throw new ExpressError(
            404,
            "Recruiter Not Found"
        );
    }

    recruiter.name = req.body.name;
    recruiter.email = req.body.email;
    recruiter.companyName = req.body.companyName;
    recruiter.designation = req.body.designation;
    recruiter.companyWebsite = req.body.companyWebsite;
    recruiter.companyLocation = req.body.companyLocation;
    recruiter.aboutCompany = req.body.aboutCompany;
    recruiter.linkedin = req.body.linkedin;
    recruiter.bio = req.body.bio;

    await recruiter.save();

    console.log("SAVE SUCCESS");

    req.flash(
        "success",
        "Profile Updated Successfully!"
    );

    res.redirect(
        "/talenttrack/recruiter/profile"
    );
};




    //Student Dashboard
    module.exports.studentDashboard=async(req,res)=>{

        const applications =
            await Application.find({
                student:req.user._id
            }).populate("job");
            console.log("APPLICATIONS =", applications);
            const validApplications =
applications.filter(
    app => app.job
);
     applications.forEach(app => {
        if(!app.job){
        console.log(
            "BROKEN APPLICATION:",
            app._id
        );
       }
       });
          const totalApplied =
            await Application.countDocuments({
                student:req.user._id
            });

        const selected =
            await Application.countDocuments({
                student:req.user._id,
                status:"Accepted"
            });

        const pending =
            await Application.countDocuments({
                student:req.user._id,
                status:"Pending"
            });

        const rejected =
            await Application.countDocuments({
                student:req.user._id,
                status:"Rejected"
            });

       res.render(
    "student/dashboard",
    {
        applications: validApplications,
        totalApplied,
        selected,
        pending,
        rejected
    }
);
    };

    //applicationTable
    module.exports.applicationTableStudent= async (req,res)=>{

        const applications = await Application.find({
            student: req.user._id
        })
        .populate("job");

        res.render(
            "student/myApplication",
            { applications }
        );
    }

      //student profile
        module.exports.studentProfile=  async(req,res)=>{
    
            const student =
            await User.findById(req.user._id);
            if(!student){
    throw new ExpressError(
        404,
        "Student Not Found"
    );
}
            res.render(
                "student/profile",
                { student }
            );
        };
    
        //Edit student profile
        module.exports.studentProfileEditPage= async(req,res)=>{
    
            const student =
            await User.findById(req.user._id);
    
            res.render(
                "student/editProfile",
                { student }
            );
        };
    
        module.exports.studentProfileEdit=  async(req,res)=>{
            
           
            const student =
            await User.findById(req.user._id);
    
            student.name = req.body.name;
            student.email = req.body.email;
            student.college = req.body.college;
            student.degree = req.body.degree;
            student.skills = req.body.skills;
            student.github = req.body.github;
            student.linkedin = req.body.linkedin;
            student.bio = req.body.bio;
    
           if(req.files.resume){
    
        student.resume = {
            url: req.files.resume[0].path,
            filename: req.files.resume[0].filename
        };
    
    }
    
    if(req.files.profileImage){
    
        student.profileImage = {
            url: req.files.profileImage[0].path,
            filename: req.files.profileImage[0].filename
        };
    
    }
            await student.save();
    
            req.flash(
                "success",
                "Profile Updated Successfully!"
            );
    
           res.redirect("/talenttrack/profile");
        };
    
        //recruiter view student
        module.exports.recruiterViewStudent= async(req,res)=>{
    
            const student =
            await User.findById(req.params.id);
            if(!student){
        throw new ExpressError(
            404,
            "Student Not Found"
        );
    }
            res.render(
                "student/viewProfile",
                { student }
            );
        };
    
         //resume upload
        
         module.exports.resumeUpload = async(req,res)=>{

    if(!req.file){

        req.flash(
            "error",
            "Please Upload Resume"
        );

        return res.redirect(
            "/talenttrack/profile"
        );
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            resume:{
                url:req.file.path,
                filename:req.file.filename
            }
        }
    );

    req.flash(
        "success",
        "Resume Uploaded Successfully!"
    );

    res.redirect("/talenttrack/profile");
};
        
            //Ai resume anaylze

 module.exports.resumeReview = async(req,res)=>{

    console.log("AI REVIEW ROUTE HIT");

    try{

        if(!req.user.resume){

            req.flash(
                "error",
                "Upload Resume First"
            );

            return res.redirect(
                "/talenttrack/profile"
            );
        }

        const prompt = `
You are an ATS Resume Reviewer.

Student Profile:

Name: ${req.user.name}
College: ${req.user.college || "Not Added"}
Degree: ${req.user.degree || "Not Added"}
Skills: ${req.user.skills || "Not Added"}
GitHub: ${req.user.github || "Not Added"}
LinkedIn: ${req.user.linkedin || "Not Added"}

Return ONLY in this format:

Score: X

Suggestions:
1. First suggestion
2. Second suggestion
3. Third suggestion

Keep response short.
`;

        const response =
        await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt
        });

        let review =
        typeof response.text === "function"
        ? response.text()
        : response.text;

        console.log("AI RESPONSE:");
        console.log(review);

        const scoreMatch =
        review.match(/Score:\s*(\d+)/i);

        const score =
        scoreMatch
        ? parseInt(scoreMatch[1])
        : 0;

        let atsStatus;

        if(score >= 8){

            atsStatus = "Excellent";

        }else if(score >= 5){

            atsStatus = "Good";

        }else{

            atsStatus = "Needs Improvement";
        }

        const suggestions =
        review.replace(
            /Score:\s*\d+/i,
            ""
        );

        res.render(
            "student/aireview",
            {
                score,
                atsStatus,
                suggestions
            }
        );

    }catch(err){

        console.log(
            "GEMINI ERROR =",
            err
        );

        req.flash(
            "error",
            "AI Review Service Temporarily Unavailable"
        );

        res.redirect(
            "/talenttrack/profile"
        );
    }
};