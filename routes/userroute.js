const express = require("express");
const router = express.Router();

const passport = require("passport");

const userController =
require("../controllers/Users");
console.log(
    "recruiterProfileEdit =",
    userController.recruiterProfileEdit
);
const {
    validateUser,validateLogin,validateStudentProfile,validateRecruiterProfile,
    validateObjectId,isLoggedIn,isRecruiter,isStudent
} = require("../middleware");


const wrapAsync =
require("../utilis/wrapAsync");

const profileUpload =
require("../public/Javascript/profileUpload");

console.log("User Routes Loaded");
router.get(
    "/",
    userController.index
);


// =====================
// REGISTER
// =====================

router.get(
    "/register",
    userController.Registerpage
);

router.post(
    "/register",
    validateUser,
    wrapAsync(
        userController.Register
    )
);


// =====================
// LOGIN
// =====================

router.get(
    "/login",
    userController.loginPage
);

router.post(
    "/login",
    validateLogin,
    passport.authenticate(
        "local",
        {
            failureRedirect:
            "/talenttrack/login",

            failureFlash:true
        }
    ),
    userController.login
);


// =====================
// LOGOUT
// =====================

router.get(
    "/logout",
    userController.logOut
);


// =====================
// RECRUITER DASHBOARD
// =====================

router.get(
    "/recruiter/dashboard",
    isLoggedIn,
    isRecruiter,
    wrapAsync(
        userController.recruiterDashboard
    )
);

router.get(
    "/recruiter/jobs",
    isLoggedIn,
    isRecruiter,
    wrapAsync(
        userController.jobTable
    )
);

router.get(
    "/recruiter/applications",
    isLoggedIn,
    isRecruiter,
    wrapAsync(
        userController.applicationTableRecruiter
    )
);

router.post(
    "/application/:id/accept",
    validateObjectId,
    isLoggedIn,
    isRecruiter,
    wrapAsync(userController.acceptApplication)
);

router.post(
    "/application/:id/reject",
    validateObjectId,
    isLoggedIn,
    isRecruiter,
    wrapAsync(userController.rejectApplication)
);

// =====================
// RECRUITER PROFILE
// =====================

router.get(
    "/recruiter/profile",
    isLoggedIn,
    isRecruiter,
    wrapAsync(
        userController.recruiterOwnProfile
    )
);

router.get(
    "/recruiter/profile/edit",
    isLoggedIn,
    isRecruiter,
    wrapAsync(
        userController.recruiterProfileEditPage
    )
);

router.put(
    "/recruiter/profile",
     isLoggedIn,
     isRecruiter,
     validateRecruiterProfile,
    wrapAsync(
        userController.recruiterProfileEdit
    )
);

router.get(
    "/recruiter/:id",
    validateObjectId,
    wrapAsync(
        userController.recruiterProfile
    )
);


// =====================
// STUDENT DASHBOARD
// =====================

router.get(
    "/student/dashboard",
    isLoggedIn,
    isStudent,
    wrapAsync(
        userController.studentDashboard
    )
);

router.get(
    "/student/applications",
    isLoggedIn,
    isStudent,
    wrapAsync(
        userController.applicationTableStudent
    )
);


// =====================
// STUDENT PROFILE
// =====================

router.get(
    "/profile",
    isLoggedIn,
    isStudent,
    wrapAsync(
        userController.studentProfile
    )
);

router.get(
    "/student/profile/edit",
    isLoggedIn,
    isStudent,
    wrapAsync(
        userController.studentProfileEditPage
    )
);

router.put(
    "/student/profile",
    isLoggedIn,
    isStudent,
    validateStudentProfile,
    profileUpload.fields([
        {
            name:"profileImage",
            maxCount:1
        },
        {
            name:"resume",
            maxCount:1
        }
    ]),
    wrapAsync(
        userController.studentProfileEdit
    )
);

//Ai anaylze

router.get(
    "/student/ai-review",
    isLoggedIn,
    isStudent,
    wrapAsync(
        userController.resumeReview
    )
);

router.get(
    "/student/:id",
    validateObjectId,
    isLoggedIn,
    isRecruiter,
    wrapAsync(
        userController.recruiterViewStudent
    )
);
router.post("/student/resume",isLoggedIn,isStudent,wrapAsync(userController.resumeUpload));



module.exports = router;