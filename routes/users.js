const router = require('express').Router();
let User = require('../models/User');
const passport = require('passport');

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req,res) => {
    User.findOne({_id: req.params.id})
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/signup').post(passport.authenticate('local'),(req,res)=> {
    User.register(new User({username: req.body.username, email: req.body.email}),
    req.body.password,(err,user)=> {
        if(errz) {
            res.status(500);
            res.setHeader('Content-Type','application/json');
            res.json({err:err, success:false, status:'Registration UnSuccessful Please Try Again'});
        }//works
        else{
                res.status(200);
                res.setHeader('Content-Type', 'application/json');
                res.json({success:true, status:'Registration Successful'});
        }
    });
});


router.route('/login').post(passport.authenticate('local', session=true),(req, res) => {
    
      if(req.user){
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: true,
        status: `You are successfully logged in! as  ${req.user.username}`,
        user:req.user.username
      });
    }
    else{
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: false,
        status: 'Incorrect Username or password'
      });
    }
  });
  
//Done
    router.route('/logout').post(passport.authenticate('local', session=true),(req, res) => {
      if(req.user){
      req.logout();
      res.json({
      success: true,
      status: 'You are successfully logged out! '
  });
}
      
      else{
        res.json({
          success: false,
          status: 'You were not Logged In!'
      });
      }
    });

module.exports = router;