import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
const GOOGLE_EMAIL_PASSWORD = process.env.GOOGLE_EMAIL_PASSWORD;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

export async function sendEmail() {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for 587
    auth: {
      user: GOOGLE_EMAIL,
      pass: GOOGLE_EMAIL_PASSWORD,
    },
  });

  transporter.sendMail({
    to: RECEIVER_EMAIL,
    subject: "Cle needs love!",
    html: "<p>Write her something sweet :)</p>",
  }).then(() => {
    console.log("Email sent");
  }).catch((error) => {
    console.error("Email error", error);
  });
}