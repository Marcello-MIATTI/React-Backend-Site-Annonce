const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// mongodb://localhost:27017/test
// mongodb+srv://koribeche:koribeche@cluster0.qpoyb.mongodb.net/test

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("connexion a la BD établie"))
  .catch((err) => console.log(err));

const userRoute = require("./routes/userRoute");
const annonceRoute = require("./routes/annonceRoute");

app.use("/api/user", userRoute);// On aura la route suivante http://localhost:5000/api/user
app.use("/api/annonce", annonceRoute); //On aura la route suivante http://localhost:5000/api/annonce

const PORT = 5000;
app.listen(PORT, () => console.log("the server is running on port " + PORT));