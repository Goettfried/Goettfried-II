const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function(event, context) {
  const { name, email, phone, message, type } = JSON.parse(event.body);

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
    subject: `Nouveau message de ${name}`,
    text: `Type: ${type}\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};