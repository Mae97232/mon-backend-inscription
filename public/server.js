const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sert les fichiers HTML, CSS, JS du dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour afficher index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
