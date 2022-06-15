//----------------- Import de mongoose-----------------------------------------------------------------------------------------------------------//
const mongoose = require("mongoose");

//---------------------------------On définit la compositon du model de notre annonce d'où le non de schéma---------------------------------------//
const annonceSchema = new mongoose.Schema(
    {
    nom: { type:String, require: true },   // On liste les caractéristiques de notre annonce modèle 
    prix: { type:String, require: true },  // Ces caractérisques sont obligatoires et ne peuvent être vide
    description: { type:String, require: true },
    photo: { type:String, require: true },
    qteDispo: { type:Number, default: 1 }  // On a définit une valeur par défault à 1 

    },
    {  // On ajoute une caractéristique optionnelle , 
        timestamps: true,  // On récupère les dates de création et mise à jour
    }
    );
    // On exporte notre model pour pouvoir l'utiliser par la suite 
    module.exports = mongoose.model("Annonce", annonceSchema);