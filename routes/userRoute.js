//----------------------- Imports--------------------------------------------------------------------------------------------------------//
const express = require("express");
const { findOne } = require("../model/User");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//--------------------------- API : Fonction : Enregister un utilisateur dans base de données ---------------------------------------------//
router.post("/register", async (req,res) => {
    try {
        const user = new User({         // On définit les caractéristiques de l'utilisateur
        fullname : req.body.fullname,
        email: req.body.email,
        password: req.body.password,

        });
        const newUser = await user.save();  // Sauvegarde dans la base de donnée 
        res.status(201).json(newUser);      //Statut 201 , tout c'est bien passée
                                           
    } catch (error){
        console.log(error)
        res.status(500).json(error.message);  // une érreur de type 500 est une erreur de type côté serveur
    }
});

//--------------------------- API : Fonction : Connecter un utilisateur à l'aide de son adresse e-mail et son mot de passe ---------------------//
router.post("/login", async (req, res) => {

try {
    const user = await User.findOne({ email:req.body.email});  // On réalise une recherche via le contenu body et surtout l'email
    if(!user){
        return res.status(400).json("L'utilisateur n'existe pas"); // 400 - pas de connexion au serveur
    }
    // On réalise un test sur le mot de passe , en le comparant.
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch){
    return res.status(400).json("mot de passe incorrect");
    }
     // " _id " est le nommage de l'id dans Mongodb Compas
     // fonction sign prend 3 params ( id , clé privée , options) , 3ième paramètre est optionnel
    const token = jwt.sign({ id: user._id},"secret") ;
    res.json(token);  // connecté
    }catch (error) {
    res.status(500).json(error.message); // une érreur de type 500 est une erreur de type côté serveur 
    }
});

module.exports = router;