var express = require('express');
var partialModel = require.main.require('./models/partial_model');
var requestModel = require.main.require('./models/request_model');
var router = express.Router();

router.get('/',function(req,res){
    partialModel.getAllCategories(function(categories){
        var data = {
            categoryList : categories,
        };
        res.render('website/index',data);
    });
});

router.post('/request',function(req,res){
    var request = {
        name: req.body.contentname,
        email: req.body.requester,
        category: req.body.category,
    }
    requestModel.insert(request, function(status){

		if(status){
			res.redirect('/');
        }
	});
});

module.exports = router;