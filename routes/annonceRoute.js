//--------------------------- Imports ---------------------------------------------------------------------------------------------------------//
const express = require("express");  // On importe express
const Annonce = require("../model/Annonce");  // On importe notre modèl Annonce
const router = express.Router(); // On importe la méthode Router

//------------------------- API : fonction : Créer une nouvelle annonce - connexion requise pour réaliser cette action--------------------------//
router.post("/", async (req, res) => {
  try {
    const headers = req.headers.authorization; // On récupère l'authorisation
    const annonce = new Annonce({      // On définit les caractéristique de notre annonce
      nom: req.body.nom,
      prix: req.body.prix,
      description: req.body.description,
      photo: req.body.photo,
      qteDispo: req.body.qteDispo,
    });

    const newAnnonce = await annonce.save();    // On définit une promisse puis on la sauvegarde
    res.status(201).json(newAnnonce);  // On retourne une réponse de succèss dans le cas favorable
  } catch (error) {
    res.status(500).json(error.message); // On retourne une réponse d'échec ( cas de non réponse du serveur)
  }
});

//------------------------- API : fonction : Récuperer les annonces du site -------------------------------------------------------------------//
router.get("/", async (req, res) => {  // On définit l'API de type GET dont url débuté "/"
  try {
    const annonces = await Annonce.find(); // On définit une promisse puis on utilise la fonction recherche
    res.json(annonces); // On renvoie le contenu des annonces
  } catch (error) {
    res.status(500).json(error.message); 
  }
});


//-------------------------API : fonction : Récuperer une annonce via son identifiant-----------------------------------------------------------//
router.get("/:id", async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);
    if(!annonce) {
      return res.status(404).json("L'annonce n'existe pas ");
    }
    res.json(annonce);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


//------------------------- API : fonction : Supprimer une annonce . Connexion requise pour réaliser cette action ----------------------------------//
router.delete("/:id" , async (req, res) => {

try {
  const annonce = await Annonce.findById(req.params.id);

  if(!annonce) {
    return res.status(404).json("L'annonce n'existe pas");
  }
  await annonce.remove();
  res.json(annonce);
}
catch(error) {
  res.status(500).json(error.message);
}
});

//-------------------------- API : fonction : Mettre à jour une annonce via sont identifant - Connexion requise pour réaliser cette action------------//
router.put("/:id", async (req, res) => {

  try {
    const annonce = await Annonce.findById(req.params.id);
    if(!annonce){
      return res.status(404).json("L'annonce n'existe pas");
    }

    annonce.nom = req.body.nom;
    annonce.prix = req.body.prix;
    annonce.description = req.body.description;
    annonce.photo = req.body.photo;
    annonce.qteAchat = req.body.qteAchat;

    await annonce.save();
    res.json(annonce);
  }
  catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;