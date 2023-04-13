const express = require("express");

const cors = require("cors");
const postsRoutes = require('./routes/user');
const app = express();

const dbConfig = require("./dataBase/dbConfig.js");

//to parse the request and create the req.body object
const bodyParser = require("body-parser");

// appel depuis notre front
var corsOptions = {
    origin: "http://127.0.0.1:63537"
};


app.use(cors(corsOptions));

// permet de récupérer les infos dans le corps de la requête
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

// parse requests of content-type - application/json
//body-parser helps to parse the request and create the req.body object
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors()); //donne access a tout le monde
app.use('/user', postsRoutes);

const db = require("./models/index");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// set port, listen for requests
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/*
mongoose.connect("mongodb://localhost:27017/api", (erreur) => {
    if (erreur) {
        console.log("Erreur de connexion :" + erreur);
        process.exit(-1);
    } else {
        console.log("Connexion BDD réussie")
            //connecter au serveur
        app.listen(5500, () => console.log('server started : 5500'));
    }

})
*/
//const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//mongoose.set('useFindAndModify', false);

/*
const mongoose = require('mongoose');

//se connecter a BDD
mongoose.connect(
    "mongodb://localhost:27017/api",
    { useNewUrlParser: true, useUnifiedTopology: true, family : 4,},
    (err) => {
        if(!err) console.log("mongodb connected");
        else console.log("connection err :" + err);
    }
)



//app.use(bodyParser.json());
//si le chemin c'est juste l'entrée, connexion au router


*/