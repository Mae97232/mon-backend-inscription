const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-email', async (req, res) => {
  console.log("👉 Données reçues sur /send-email :", req.body);

  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'yorickspprt@gmail.com',
      pass: 'dnltotxzjqsefgyr'
    }
  });

  const mailOptions = {
    from: 'yorickspprt@gmail.com',
    to: to,
    subject: subject,
    html: html
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé :', info.response);
    res.send('Email envoyé avec succès');
  } catch (error) {
    console.error('🚨 Erreur réelle lors de l\'envoi :', error); // 🔥 ici l'erreur sera bien visible
    res.status(500).send('Erreur réelle lors de l\'envoi de l\'email');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});