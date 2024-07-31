require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendEmail(name, email, phone, message, type) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New message from ${type}`,
    text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;