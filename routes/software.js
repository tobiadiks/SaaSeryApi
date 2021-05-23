const router = require('express').Router();
let Software = require('../models/software');

router.get('/', (req, res) => {

    Software.find()
    .then(software =>  res.json(software))
    .catch(err => res.status(400).json('Error :' + err));
});

router.get('/:id', (req, res) => {
//finds software by id
    Software.find()
    .then(software =>  res.json(software))
    .catch(err => res.status(400).json('Error :' + err));
});

router.post('/add', (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const description = req.body.description;
    const link = req.body.link;
    const pricing = req.body.pricing;

    const newSoftware = new Software({
        username,
        name,
        description,
        link,
        pricing,
    });

    newSoftware.save()
    .then(()=>  res.json("Software added"))
    .catch(err => res.status(400).json('Error :' + err));
});

router.get('/search', (req, res) => {
   const search = req.body.search;

   Software.find({'name':search})
   .then(result =>  res.json(result))
   .catch(err => res.status(400).json('Error :'+ err));
});

module.exports = router;