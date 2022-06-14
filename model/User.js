const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
    fullname: { type:String, require: true },
    email: { type:String, require: true },
    password: { type:String, require: true }
    },
    {
        // Deuxième param , pour configurer une option supplémentaire
     timestamps: true,    // les valeurs de date de création / mise à jour seront mise à jour via cette commande.
    }
    );

    // Code universelle - On peux l'utiliser d'un projet à l'autre 
    userSchema.pre("save" , function() {
        // Pour éviter de crypter un mot de pase déjà crypté
        if(this.isModified("password")){ // verification d'un changement "isModified"
            this.password = bcrypt.hashSync(this.password,10); // mise à jour du passeword avec la version cryté
        }
    });


    module.exports = mongoose.model("User", userSchema);