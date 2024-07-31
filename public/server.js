const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/send-email', (req, res) => {
  // Code pour envoyer l'email
  const nodemailer = require('nodemailer');
  require('dotenv').config();

  const { name, email, phone, message, type } = req.body;

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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: 'Email envoyé avec succès!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});