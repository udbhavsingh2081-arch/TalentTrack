const Job = require ("../models/job");

const Application = require("../models/application");
const ExpressError = require("../utilis/expressError");


//jobs display
module.exports.Jobindex=  async(req,res)=>{

        let alljobs;

        if(req.query.search){

            alljobs = await Job.find({

                $or:[

                    {
                        title:{
                            $regex:req.query.search,
                            $options:"i"
                        }
                    },

                    {
                        company:{
                            $regex:req.query.search,
                            $options:"i"
                        }
                    }

                ]

            });

            if(alljobs.length === 0){

                req.flash(
                    "error",
                    "Job Not Available"
                );

                return res.redirect(
                    "/talenttrack/jobs"
                );
            }

        } else {

            alljobs = await Job.find();

        }

        res.render(
            "jobs/index",
            { alljobs }
        );

    };

    //specific Job
module.exports.singleJob = async(req,res)=>{

    const { id } = req.params;

    const job = await Job.findById(id)
    .populate("recruiter");

    if(!job){
        throw new ExpressError(
            404,
            "Job Not Found"
        );
    }

    let alreadyApplied = false;
    let isOwner = false;

    if(req.user && job.recruiter){
        isOwner =
        job.recruiter._id.equals(req.user._id);
    }

    if(req.user && req.user.role === "student"){

        const application = await Application.findOne({
            student: req.user._id,
            job: id
        });

        if(application){
            alreadyApplied = true;
        }
    }

    res.render("jobs/show",{
        job,
        alreadyApplied,
        isOwner
    });
};

//newJob
module.exports.newJobpage=(req,res)=>{
       res.render("jobs/new");
};

module.exports.newJob=async(req,res)=>{
        console.log(req.file);
        const job = new Job(req.body);

        job.recruiter = req.user._id;

        if(req.file){

            job.companyLogo = {
                url: req.file.path,
                filename: req.file.filename
            };

        }

        await job.save();

        req.flash(
            "success",
            "Job Posted Successfully!"
        );

        res.redirect(
            "/talenttrack/recruiter/dashboard"
        );
    };

    //Job Edit

    module.exports.editJobPage=async(req,res)=>{
    let {id}=req.params;
    let oldJob=await Job.findById(id);
    if(!oldJob){
    throw new ExpressError(
        404,
        "Job Not Found"
    );
}
    res.render("jobs/edit",{oldJob});
};

module.exports.editJob = async(req,res)=>{

    let { id } = req.params;

    let job = await Job.findByIdAndUpdate(
        id,
        req.body,
        { new:true }
    );

    if(req.file){

        job.companyLogo = {
            url: req.file.path,
            filename: req.file.filename
        };

        await job.save();
    }

    req.flash(
        "success",
        "Job Updated Successfully!"
    );

    res.redirect(`/talenttrack/jobs/${id}`);
};

// Delete Job

module.exports.deleteJob=async(req,res)=>{
    let {id}=req.params;
    const job =
await Job.findById(id);

if(!job){
    throw new ExpressError(
        404,
        "Job Not Found"
    );
}
    await Job.findByIdAndDelete(id);
    req.flash(
    "success",
    "Job Deleted Successfully!"
);

    res.redirect("/talenttrack/jobs");
};

// Application
module.exports.application= async(req,res)=>{

        const {id} = req.params;

        const job = await Job.findById(id);

if(!job){
    throw new ExpressError(
        404,
        "Job Not Found"
    );
}

        const application = new Application({
            student:req.user._id,
            job:id
        });

        await application.save();

        req.flash("success","Application Submitted!");

        res.redirect(`/talenttrack/jobs/${id}`);
    };

  
    //Apply Job Button
    module.exports.applyJob=  async(req,res)=>{

            if(!req.user.resume?.url){

        req.flash(
            "error",
            "Please upload your resume before applying."
        );

        return res.redirect(
            "/talenttrack/profile"
        );
    }
        const { id } = req.params;

        // Prevent duplicate applications
        const existingApplication =
        await Application.findOne({
            student: req.user._id,
            job: id
        });

        if(existingApplication){
            req.flash(
                "error",
                "You have already applied for this job!"
            );

            return res.redirect(
                `/talenttrack/jobs/${id}`
            );
        }

        const application = new Application({
            student: req.user._id,
            job: id,
            status: "Pending"
        });

        await application.save();

        req.flash(
            "success",
            "Application Submitted Successfully!"
        );

        res.redirect(
            "/talenttrack/student/applications"
        );
    };

  