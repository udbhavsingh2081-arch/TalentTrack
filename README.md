# TalentTrack

TalentTrack is a Full-Stack Job Portal built using Node.js, Express.js, MongoDB, and EJS. It connects students with recruiters, allowing job posting, applications, profile management, and AI-powered resume review.

## Features

### Student Features
- User Registration & Login
- Student Profile Management
- Resume Upload
- Profile Image Upload
- Browse Available Jobs
- Apply for Jobs
- Track Applications
- Save Jobs
- AI Resume Review

### Recruiter Features
- Recruiter Registration & Login
- Recruiter Profile Management
- Post New Jobs
- Edit/Delete Jobs
- View Applications
- Manage Job Listings

### Security & Validation
- Passport Authentication
- Session Management
- Role-Based Authorization
- Joi Validation
- Flash Messages
- Protected Routes

## Tech Stack

### Frontend
- EJS
- HTML5
- CSS3
- Bootstrap 5
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Passport.js
- Passport Local Mongoose

### Cloud Services
- Cloudinary (Image & Resume Storage)

## Project Structure

```
TalentTrack
│
├── controllers
├── models
├── routes
├── views
├── public
├── middleware.js
├── schema.js
├── app.js
└── package.json
```

## Installation

### Clone Repository

```bash
git clone https://github.com/udbhavsingh2081-arch/TalentTrack.git
cd TalentTrack
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file:

```env
ATLASDB_URL=your_mongodb_url

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret

GEMINI_API_KEY=your_gemini_api_key
```

### Run Project

```bash
npm start
```

or

```bash
nodemon app.js
```

## Future Improvements

- React Frontend
- Job Recommendation System
- Resume Parsing
- Interview Preparation AI
- Recruiter Analytics Dashboard
- Email Notifications
- Real-Time Chat

## Author

**Udbhav Singh Chouhan**

B.Tech CSE Student  
Full-Stack Web Developer

GitHub:
https://github.com/udbhavsingh2081-arch

---

⭐ If you found this project useful, consider giving it a star.
