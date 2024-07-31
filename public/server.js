require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const sendEmail = require('./functions/sendTestEmail');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: 'Trop de requêtes créées à partir de cette IP, veuillez réessayer après 15 minutes',
});

app.use('/api/', limiter);

app.use(bodyParser.json());

app.post('/api/send-email', (req, res) => {
  const { name, email, phone, message, type } = req.body;
  console.log("Requête reçue avec les données:", req.body);
  sendEmail(name, email, phone, message, type)
    .then(() => res.status(200).send('Email envoyé avec succès'))
    .catch(error => {
      console.error("Erreur lors de l'envoi de l'email:", error);
      res.status(500).send(`Erreur lors de l'envoi de l'email: ${error.message}`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});