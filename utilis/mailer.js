const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

transporter.verify((error, success) => {

    if(error){
        console.log("SMTP ERROR:", error);
    }else{
        console.log("SMTP READY");
    }

});

console.log("Mailer Loaded");

module.exports = transporter;