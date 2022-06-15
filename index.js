//----------------- Import de mongoose et la méthode de cryptage "bcrypt"  ---------------------------------------------------------------------//
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());  // On permet à notre application de pouvoir lire les fichiers .json

// mongodb://localhost:27017/test
// mongodb+srv://koribeche:koribeche@cluster0.qpoyb.mongodb.net/test

mongoose     // On définit notre connexion base de donnée avec outil mongoose
  .connect("mongodb://localhost:27017/ecommerce")  // Url 
  .then(() => console.log("connexion a la BD établie"))  // 
  .catch((err) => console.log(err));

const userRoute = require("./routes/userRoute");  // On récupère la route de la partie utilisateur 
const annonceRoute = require("./routes/annonceRoute"); // On récupère la route de la partie annonce 

app.use("/api/user", userRoute);// On aura la route suivante http://localhost:5000/api/user
app.use("/api/annonce", annonceRoute); //On aura la route suivante http://localhost:5000/api/annonce

const PORT = 5000;  // On choisit arbitrairement un port 
app.listen(PORT, () => console.log("the server is running on port " + PORT));  // On relie notre application au port 5000  + un message de console