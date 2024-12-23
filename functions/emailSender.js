import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
const GOOGLE_EMAIL_PASSWORD = process.env.GOOGLE_EMAIL_PASSWORD;

export async function sendEmail() {

  console.log("GOOGLE_EMAIL:", process.env.GOOGLE_EMAIL);
  console.log("GOOGLE_EMAIL_PASSWORD:", process.env.GOOGLE_EMAIL_PASSWORD);


  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use true for port 465, false for 587
    auth: {
      user: GOOGLE_EMAIL,
      pass: GOOGLE_EMAIL_PASSWORD,
    },
  });

  transporter.sendMail({
    to: "bastian.steingruber@gmx.ch",
    subject: "Cle needs love!",
    html: "<p>Write her something sweet :)</p>",
  }).then(() => {
    console.log("Email sent");
  }).catch((error) => {
    console.error("Email error", error);
  });
}