const mongoose = require("mongoose");
const Job = require("../models/job");

const MONGO_URL = "mongodb://127.0.0.1:27017/talenttrack";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("DB Connected");
}

main().catch(err => console.log(err));

async function initJobs() {

    await Job.deleteMany({});

   const sampleJobs = [
    {
        title: "Frontend Developer Intern",
        company: "Google",
        description: "Build responsive user interfaces using HTML, CSS, JavaScript and React.",
        salary: 25000,
        location: "Bangalore"
    },
    {
        title: "Backend Developer Intern",
        company: "Microsoft",
        description: "Develop REST APIs using Node.js, Express.js and MongoDB.",
        salary: 30000,
        location: "Hyderabad"
    },
    {
        title: "Full Stack Developer",
        company: "Amazon",
        description: "Work on frontend and backend systems using MERN stack.",
        salary: 1200000,
        location: "Bangalore"
    },
    {
        title: "Software Development Engineer Intern",
        company: "Adobe",
        description: "Assist in building scalable web applications and cloud services.",
        salary: 35000,
        location: "Noida"
    },
    {
        title: "React Developer",
        company: "Flipkart",
        description: "Create modern React applications and improve user experience.",
        salary: 800000,
        location: "Bangalore"
    },
    {
        title: "Node.js Developer",
        company: "Zomato",
        description: "Develop backend services and APIs using Node.js and Express.",
        salary: 700000,
        location: "Gurgaon"
    },
    {
        title: "MERN Stack Intern",
        company: "Razorpay",
        description: "Build full-stack applications using MongoDB, Express, React and Node.",
        salary: 28000,
        location: "Bangalore"
    },
    {
        title: "Java Developer",
        company: "Infosys",
        description: "Develop enterprise applications using Java and Spring Boot.",
        salary: 650000,
        location: "Pune"
    },
    {
        title: "AI/ML Intern",
        company: "OpenAI Labs",
        description: "Work on machine learning models, data processing and AI applications.",
        salary: 40000,
        location: "Remote"
    },
    {
        title: "Cloud Engineer",
        company: "TCS",
        description: "Manage cloud infrastructure and deployment pipelines.",
        salary: 750000,
        location: "Mumbai"
    }
];
    await Job.insertMany(sampleJobs);

    console.log("Jobs Added Successfully");

    mongoose.connection.close();
}

initJobs();