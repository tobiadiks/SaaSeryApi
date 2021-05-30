const router = require('express').Router();
const Software = require('../models/software');



router.get('/', (req, res) => {

    Software.find()
    .then(software =>  res.json(software))
    .catch(err => res.status(400).json('Error :' + err));
});

router.get('/Detail/:id', (req, res) => {
//finds software by id
    Software.find({'_id':req.params.id})
    .then(software =>  res.json(software))
    .catch(err => res.status(400).json('Error :' + err));
}); //Done

router.post('/add', (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const description = req.body.description;
    const link = req.body.link;
    const category = req.body.category;
    const pricing = req.body.pricing;
    const type = req.body.type;

    const newSoftware = new Software({
        username,
        name,
        description,
        link,
        category,
        pricing,
        type,
    });

    newSoftware.save()
    .then(()=>  res.json("Software added"))
    .catch(err => res.status(400).json('Error :' + err));
}); //Done

router.get('/:search', (req, res) => {
   Software.find({'name':req.params.search})
   .then(result =>  res.json(result))
   .catch(err => res.status(400).json('Error :'+ err));
});


//type; featured & new
router.get('/type/:type', (req,res) => {
    Software.find({'type': req.params.type})
    .then(result =>  res.json(result))
    .catch(err => res.status(400).json(`Error ${err}`));
});


//category
router.get('/category/:category', (req,res) => {
    Software.find({'category': req.params.category})
    .then(result =>  res.json(result))
    .catch(err => res.status(400).json(`Error ${err}`));
});


module.exports = router;