const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmail = async (name, email, phone, message, type) => {
  console.log('SendEmail function called with:', { name, email, phone, message, type }); // Ajout de message de débogage

  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER, // Mettez ici l'adresse email de destination
    subject: `Nouveau message de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}\nType: ${type}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully'); // Ajout de message de débogage
  } catch (error) {
    console.error('Error in sendEmail:', error); // Ajout de message de débogage
    throw error;
  }
};

module.exports = sendEmail;