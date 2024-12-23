import nodemailer from "nodemailer";
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from "$env/static/private";

export async function sendEmail() {
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