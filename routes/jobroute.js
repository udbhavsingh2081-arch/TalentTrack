const express = require("express");
const router=express.Router();
const { isLoggedIn,isRecruiter,isJobOwner,isStudent, validateJob,validateObjectId } = require("../middleware.js");
const jobController=require("../controllers/job.js");


const upload = require("../public/Javascript/cloudLogo.js");

const wrapAsync=require("../utilis/wrapAsync.js");


// All Jobs
router.get(
    "/",
    wrapAsync(
        jobController.Jobindex
    )
);


// New Job Form
router.get(
    "/new",
    isLoggedIn,
    isRecruiter,
    jobController.newJobpage
);


// Create Job
router.post(
    "/",
    isLoggedIn,
    isRecruiter,
    validateJob,
    upload.single("companyLogo"),
    wrapAsync(
        jobController.newJob
    )
);


// Show Job
router.get(
    "/:id",
    validateObjectId,
    wrapAsync(
        jobController.singleJob
    )
);


// Edit Form
router.get(
    "/edit/:id",
    validateObjectId,
    isLoggedIn,
    isRecruiter,
    isJobOwner,
    wrapAsync(
        jobController.editJobPage
    )
);


// Update Job
router.put(
    "/:id",
    validateObjectId,
    isLoggedIn,
    isRecruiter,
    isJobOwner,
    validateJob,
    upload.single("companyLogo"),
    wrapAsync(
        jobController.editJob
    )
);


// Delete Job
router.delete(
    "/:id",
    validateObjectId,
    isLoggedIn,
    isRecruiter,
    wrapAsync(
        jobController.deleteJob
    )
);
 //apply job
router.post(
    "/:id/apply",
    validateObjectId,
    isLoggedIn,
    isStudent,
    wrapAsync(
        jobController.applyJob
    )
);

module.exports = router;
