const express = require("express");
const Annonce = require("../model/Annonce");
const router = express.Router();

// Créer une nouvelle annonce
router.post("/", async (req, res) => {
  try {
    const annonce = new Annonce({
      nom: req.body.nom,
      prix: req.body.prix,
      description: req.body.description,
      photo: req.body.photo,
      qteDispo: req.body.qteDispo,
    });

    const newAnnonce = await annonce.save();
    res.status(201).json(newAnnonce);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Récuperer les annonces du site
router.get("/", async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.json(annonces);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


// Récuperer une annonce via son id
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


// API pour supprimer une annonce 
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

// metre à jour une annonce avec son id
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