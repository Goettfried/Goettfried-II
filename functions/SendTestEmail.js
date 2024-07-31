require('dotenv').config();

const nodemailer = require('nodemailer');

async function sendEmail(name, email, phone, message, type) {
  console.log("Préparation de l'envoi d'email avec les variables d'environnement:", {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Ajout de pass pour vérifier la présence
  }); // Ajout de message de débogage

  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New ${type} message from ${name}`,
    text: `You have received a new message from ${name} (${email}, ${phone}):\n\n${message}`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé:", info.response); // Ajout de message de débogage
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error); // Ajout de message de débogage
    throw error;
  }
}

module.exports = sendEmail;