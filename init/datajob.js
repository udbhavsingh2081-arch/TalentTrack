const mongoose = require("mongoose");
const Job = require("../models/job");

const MONGO_URL = "mongodb://127.0.0.1:27017/talenttrack";

const sampleJobs = [
  {
    title: "Frontend Developer Intern",
    description: "Build responsive UI using HTML, CSS and JavaScript.",
    salary: 15000,
    location: "Indore"
  },
  {
    title: "MERN Stack Developer",
    description: "Work with MongoDB, Express, React and Node.js.",
    salary: 600000,
    location: "Bangalore"
  },
  {
    title: "Backend Developer",
    description: "Develop REST APIs using Express and MongoDB.",
    salary: 700000,
    location: "Pune"
  }
];

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    await Job.deleteMany({});
    await Job.insertMany(sampleJobs);

    console.log("Jobs Added Successfully");

    mongoose.connection.close();
}

main().catch(console.log);