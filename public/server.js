const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sert les fichiers HTML, CSS, JS du dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Permet de lire les données envoyées via les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route principale pour afficher index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour envoyer un email
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  // Configurer le transporteur d'email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tonemail@gmail.com',
      pass: 'tonmotdepasseapplication' // pas ton mot de passe normal Gmail !
    }
  });

  const mailOptions = {
    from: 'tonemail@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi :', error);
      res.status(500).send('Erreur lors de l\'envoi de l\'email');
    } else {
      console.log('Email envoyé :', info.response);
      res.send('Email envoyé avec succès');
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
