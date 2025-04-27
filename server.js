const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sert les fichiers du dossier "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour la page espace client
app.get('/espace-mon-client.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'espace-mon-client.html'));
});

// Route pour envoyer un email
app.post('/send-email', (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: 'yorickspprt@gmail.com', // Tu peux mettre aussi process.env.EMAIL_USER ici
    to: to,
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('🚨 Erreur lors de l\'envoi :', error);
      return res.status(500).send('Erreur lors de l\'envoi de l\'email');
    } else {
      console.log('✅ Email envoyé :', info.response);
      return res.send('Email envoyé avec succès');
    }
  });
});

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});