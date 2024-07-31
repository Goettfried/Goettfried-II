const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail(name, email, phone, message, type) {
  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\nType: ${type}`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendTestEmail;