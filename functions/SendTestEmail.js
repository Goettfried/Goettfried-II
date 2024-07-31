const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (name, email, phone, message, type) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Nouveau message de ${name} (${type})`,
    text: `
      Nom: ${name}
      Email: ${email}
      Téléphone: ${phone || 'Non fourni'}
      Message: ${message}
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;