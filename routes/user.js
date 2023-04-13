const express = require('express');
const { Error } = require('mongoose');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/users');

/*
router.get('/', (req, res) => {
    PostsModel.find((err, users) => {
        if (!err) res.status(200).send(users);
        else console.log("error to get data : " + err);
        console.log(users);
    })
})
*/

// se connecter
router.get('/:email/:mdp', (req, res) => {
    let email = req.params.email;
    let mdp = req.params.mdp;

    PostsModel.find({ email }, function(err, docs) {
        try {
            let user_mdp = docs[0]['mdp'];
            console.log(docs[0]['mdp'])
            if (user_mdp == mdp) {
                res.status(200).send(docs);
                console.log("docs :", docs)
            } else { res.sendStatus(404) }

        } catch (err) {
            res.sendStatus(404)
            console.log("error to get data : " + err);
        }
    });

});



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
        try {
            res.status(201).send(docs);
        } catch (err) {
            res.status(404);
            console.log("error creating new data : " + err);
        }

    })
});


router.delete('/email', (req, res) => {
    PostsModel.findByIdAndRemove({ _email: email },
        function(err, docs) {
            try {
                res.status(200).send(docs);
                //console.log("docs :", docs)
            } catch (err) {
                res.status(404);
                console.log("delete error : " + err);
            }
        })
})


//modifier
router.put("/wishlist/:email", (req, res) => {
    let email = req.params.email;
    let wishlist = req.body.wishlist;
    let wishs = [];

    PostsModel.find({ email: email }, function(err, docs) {
        try {
            console.log('docs : ', docs);
            console.log('docs[0].wishlist : ', docs[0].wishlist);

            if ((docs[0].wishlist).length > 0) {
                (docs[0].wishlist).forEach(element => {
                    console.log("el:", element);
                    if (element != null && element != wishlist) {
                        wishs.push(element);
                    }
                });
            }

            wishs.push(wishlist);

            //console.log('wishs:', wishs)

            const updateRecord = {
                email: email,
                mdp: req.body.mdp,
                wishlist: wishs,
            };


            PostsModel.findOneAndUpdate({ email: email }, { $set: updateRecord }, { new: true },
                (err, docs) => {
                    try {
                        console.log('docs 2: ', docs);
                        res.status(200).send(docs);
                    } catch (err) {
                        res.status(404);
                        console.log("Update error : " + err);
                    }

                }
            );
        } catch (err) {
            res.status
            console.log("error to get data : " + err);
        }
    });
})

router.put("/likelist/:email", (req, res) => {
    let email = req.params.email;
    let likelist = req.body.likelist;
    let likes = [];

    PostsModel.find({ email: email }, function(err, docs) {
        try {
            console.log('docs_like : ', docs);
            console.log('docs[0].likelist : ', docs[0].likelist);

            if ((docs[0].likelist).length > 0) {
                (docs[0].likelist).forEach(element => {
                    console.log("el:", element);
                    if (element != null && element != likelist) {
                        likes.push(element);
                    }
                });
            }

            likes.push(likelist);

            //console.log('wishs:', wishs)

            const updateRecord = {
                email: email,
                mdp: req.body.mdp,
                likelist: likes,
            };

            PostsModel.findOneAndUpdate(
                //{ email: email }, { wishlist: wishlist });
                { email: email }, { $set: updateRecord }, { new: true },
                (err, docs) => {
                    try {
                        console.log('docs like2: ', docs);
                        res.status(200).send(docs)
                    } catch (err) {
                        res.status(404);
                        console.log("Update error : " + err);
                    }

                }
            );
        } catch (err) {
            res.status(404);
            console.log("error to get data : " + err);
        }
    });
})

router.get("/wishlist/:email/:mdp", (req, res) => {
    let email = req.params.email;
    let mdp = req.params.mdp;
    PostsModel.find({ email: email, mdp: mdp }, function(err, docs) {
        console.log('docs wishlist: ', docs[0].wishlist);
        try {
            res.status(200).send(docs[0].wishlist)
        } catch (err) {
            res.status(404);
            console.log(" error : " + err);
        }
    });
});

router.get("/likelist/:email/:mdp", (req, res) => {
    let email = req.params.email;
    let mdp = req.params.mdp;
    PostsModel.find({ email: email, mdp: mdp }, function(err, docs) {
        console.log('docs likelist: ', docs[0].likelist);
        try {
            res.status(200).send(docs[0].likelist)
        } catch (err) {
            res.status(404);
            console.log(" error : " + err);
        }
    });
});

//delete
router.delete("/:email", (req, res) => {
    if (!ObjectID.isValid(req.params.email))
        return res.status(400).send("email unknown : " + req.params.email)
    PostsModel.findByIdAndRemove(
        req.params.email,
        (err, docs) => {
            try {
                res.send(docs);
            } catch (err) {
                console.log("delete error : " + err);
            }
        }
    );
});

module.exports = router;