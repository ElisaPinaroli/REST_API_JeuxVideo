const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/users');

router.get('/', (req, res) => {
    PostsModel.find((err, users) => {
        if (!err) res.status(200).send(users);
        else console.log("error to get data : " + err);
        console.log(touristes);
    })
})

router.get('/:email', (req, res) => {
    let email = req.params.email;
    console.log("email: ", email)
    PostsModel.find({ email }, function(err, docs) {
        if (!err) {
            res.status(200).send(docs);
            console.log("docs :", docs)
        } else console.log("delete error : " + err);
    });
});

// il faut un contrôle pour ne pas avoir 2 continents avec le même nom
// 1- fonction get ==> sauvegarder la liste des continents
// 2- faire une boucle et vérifier que le continent n'est pas dans la liste.


//creer
//http://localhost:5500/user/
router.post('/', (req, res) => {
    console.log(req.body);
    const newRecord = new PostsModel({
        nom: req.body.nom,
        email: req.body.email,
        mdp: req.body.mdp
    });

    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log("error creating new data : " + err);

    })
});

router.get('/:email/:mdp', (req, res) => {
    const email = req.params.email;
    const mdp = req.params.mdp;
    //console.log(mdp);
    const user = PostsModel.find({ email });
    console.log('(user.mdp : ', user.mdp);
    console.log('(user.email : ', user.email);
    if (user != null) {
        if (mdp === user.mdp) {
            res.sendStatus(200);
            console.log("====== status 200");
        } else {
            console.log("erreur");
        }
    } else {
        console.log("erreur 2");
    }

});






//modifier _ update mdp
router.put("/:email", (req, res) => {
    if (!ObjectID.isValid(req.params.email))
        return res.status(400).send("ID unknown : " + req.params.email)
    const updateRecord = {
        email: req.body.email,
        mdp: req.body.mdp
    };

    PostsModel.findByIdAndUpdate(
        req.params.email, { $set: updateRecord }, { new: true },
        (err, docs) => {
            if (!err) res.send(docs)
            else console.log("Update error : " + err);

        }
    );
})

//delete 
router.delete("/:email", (req, res) => {
    if (!ObjectID.isValid(req.params.email))
        return res.status(400).send("email unknown : " + req.params.email)
    PostsModel.findByIdAndRemove(
        req.params.email,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("delete error : " + err);
        }
    );
});

module.exports = router;