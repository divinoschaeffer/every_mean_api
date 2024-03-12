const express = require("express");
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();
const port = process.env.PORT || 3000;


mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connecté à la base de données MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données MongoDB :', err);
  });

  mongoose.connection.on('error', (err) => {
    console.error('Erreur de connexion à MongoDB :', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Déconnexion de MongoDB');
  });

const corsOptions = {
    origin: true,
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Bonjour, bienvenu sur l'API de ERvery-Mean!");
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});