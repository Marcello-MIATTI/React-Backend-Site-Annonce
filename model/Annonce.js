const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema(
    {
    nom: { type:String, require: true },
    prix: { type:String, require: true },
    description: { type:String, require: true },
    photo: { type:String, require: true },
    qteDispo: { type:Number, default: 1 }

    },
    {
        timestamps: true,
    }
    );
    module.exports = mongoose.model("Annonce", annonceSchema);