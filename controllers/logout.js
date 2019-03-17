var express = require('express');
var router = express.Router();


//ROUTES

router.get('/', function(req, res){
    req.session.un = null;
    req.session.uid = null;
	res.redirect('/');
});

module.exports = router;