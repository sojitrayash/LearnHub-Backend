// server/utils/mailSender.js

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,         // <-- Add this line
      secure: true,      // <-- Add this line
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: 'LearnHub <no-reply@learnhub.com>',
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    
    console.log("Email sent successfully:", info.response);
    return info;

  } catch (error) {
    console.error("Error sending email:", error);
    // Add this to see more detailed errors
    throw error; 
  }
};

module.exports = mailSender;