const Joi = require("joi");


module.exports.userSchema = Joi.object({

    name: Joi.string()
        .min(2)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    role: Joi.string()
        .valid("student", "recruiter")
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    college: Joi.string().allow(""),
    degree: Joi.string().allow(""),
    skills: Joi.string().allow(""),
    github: Joi.string().uri().allow(""),
    linkedin: Joi.string().uri().allow(""),
    bio: Joi.string().max(500).allow(""),
    graduationYear: Joi.number().allow(null),
    companyName: Joi.string().allow(""),
    companyWebsite: Joi.string().uri().allow(""),
    companyLocation: Joi.string().allow(""),
    designation: Joi.string().allow(""),
    aboutCompany: Joi.string().max(1000).allow("")
});

module.exports.loginSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
});

module.exports.jobSchema =
Joi.object({

    title:Joi.string()
        .required(),

    company:Joi.string()
        .required(),

    location:Joi.string()
        .required(),

    salary:Joi.number()
        .min(0)
        .max(10000000)
        .required(),

    description:Joi.string()
        .min(20)
        .required()
});

module.exports.studentProfileSchema =
Joi.object({

    college:Joi.string()
        .allow(""),

    degree:Joi.string()
        .allow(""),

    skills:Joi.string()
        .allow(""),

    github:Joi.string()
        .allow(""),

    linkedin:Joi.string()
        .allow(""),

    bio:Joi.string()
        .max(500)
        .allow("")
});

module.exports.recruiterProfileSchema =
Joi.object({
  name: Joi.string().required(),
    email: Joi.string().email().required(),
    companyName:Joi.string()
        .allow(""),

    designation:Joi.string()
        .allow(""),

    companyWebsite:Joi.string()
        .allow(""),

    companyLocation:Joi.string()
        .allow(""),

    aboutCompany:Joi.string()
        .max(1000)
        .allow(""),

    linkedin:Joi.string()
        .allow(""),

    bio:Joi.string()
        .max(500)
        .allow("")
});