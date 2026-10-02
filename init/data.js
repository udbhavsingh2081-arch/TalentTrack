const mongoose = require("mongoose");
const User = require("../models/user");

const MONGO_URL = "mongodb://127.0.0.1:27017/talenttrack";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
}

main().catch(err => console.log(err));

const initData = [
    {
        name: "Rahul Sharma",
        email: "rahul@student.com",
        role: "student"
    },
    {
        name: "Priya Verma",
        email: "priya@student.com",
        role: "student"
    },
    {
        name: "Aman Gupta",
        email: "aman@recruiter.com",
        role: "recruiter"
    },
    {
        name: "Neha Singh",
        email: "neha@recruiter.com",
        role: "recruiter"
    }
];

async function initDB() {
    await User.deleteMany({});

    for (let userData of initData) {
        const user = new User(userData);
        await User.register(user, "password123");
    }

    console.log("Dummy users added");
    mongoose.connection.close();
}

initDB();