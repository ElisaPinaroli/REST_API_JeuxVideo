const mongoose = require("mongoose");
//cree model de BDD
const PostsModel = new mongoose.model(
    "JeuxVideo", {
        nom: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        mdp: {
            type: String,
            required: true
        },
        wishlist: {
            type: Array,
            required: false

        },
        likelist: {
            type: Array,
            required: false
        }

    },
    "users" //table
);

module.exports = { PostsModel }; //acces a postsmodel depuis toute l'appli