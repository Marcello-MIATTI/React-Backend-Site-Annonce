const express = require("express");
const { findOne } = require("../model/User");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// on définit l'API qui permet 
router.post("/register", async (req,res) => {
    try {
        const user = new User({
        fullname : req.body.fullname,
        email: req.body.email,
        password: req.body.password,

        });
        const newUser = await user.save();  // Sauvegarde dans la base de donnée 
        res.status(201).json(newUser);
                                           //Statut 200 , tout c'est bien passée
    } catch (error){
        console.log(error)
        res.status(500).json(error.message);  // une érreur de type 500 est une érreur de type côté serveur
    }
});

// Etape récuperer récupérer utilisateur à l'aide de son adresse e-mail
router.post("/login", async (req, res) => {

try {
    const user = await User.findOne({ email:req.body.email});
    if(!user){
        return res.status(400).json("L'utilisateur n'existe pas");
    }
    // On réalise un test sur le mot de passe , en le comparant.
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch){
    return res.status(400).json("mot de passe incorrect");
    }
     // _id est le nommage de l'id dans mongo db compas
     // fonction sign prend 3 params ( id , clé privée , options)
    const token = jwt.sign({ id: user._id},"secret") ;
    res.json(token);  // connecté
    }catch (error) {
    res.status(500).json(error.message);
    }
});

module.exports = router;