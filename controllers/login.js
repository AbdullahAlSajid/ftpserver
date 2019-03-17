var express = require('express');
var userModel = require.main.require('./models/user_model');
var router = express.Router();

router.get('/',function(req,res){
    res.render('website/login');
});

router.post('/',function(req,res){
    var user = {
        email: req.body.uname,
        password: req.body.password
    };

    userModel.validate(user, function(result){
        if(result != ""){
            req.session.un = result.name;
            req.session.uid = result.id;
            req.session.type = result.type

            res.redirect('/home');
        }else{
            res.redirect('/login');
        }		
    });
});

module.exports = router;