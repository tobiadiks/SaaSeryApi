const router = require('express').Router();
let User = require('../models/User');

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/signup').post((req,res) => {
    const username = req.body.username;
    const email = req.body.email;


    const newUser = new User({
        username,
        email,
});

    newUser.save()
    .then(()=>  res.json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;