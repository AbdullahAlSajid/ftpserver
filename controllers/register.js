var express = require('express');
var userModel = require.main.require('./models/user_model');

var router = express.Router();

router.get('/',(req,res)=>res.render('website/register'));

router.post('/',function(req,res){
    var user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        type: req.body.type
    };

    userModel.insert(user,function(success){
        if(success){
            res.redirect('/login');
        }else{
            res.redirect('/register');
        }
    })
});

module.exports = router;