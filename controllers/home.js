var express = require('express');
var userModel = require.main.require('./models/user_model');
var contentModel = require.main.require('./models/content_model');
var partialModel = require.main.require('./models/partial_model');
var requestModel = require.main.require('./models/request_model');
var router = express.Router();

router.get('*', function(req, res, next){
	if(req.session.un != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/',function(req,res){
    if(req.session.uid != null){
            var data = {
                name: req.session.un,
                type: req.session.type
            };
            res.render('portal/index',data);
    }else{
        res.redirect('/login');
    }
});

router.get('/profile',function(req,res){
    if(req.session.uid != null){
        userModel.get(req.session.uid,function(result){
	
            var data = {
                id : req.session.uid,
                name: req.session.un,
                type: req.session.type,
                user: result
            };
            if(result != ""){
                res.render('portal/profile', data);
            }else{
                res.redirect('/home');
            }
            
        });
    }else{
        res.redirect('/login');
    }
});

router.get('/user',function(req,res){
    if(req.session.uid != null){
        userModel.getAll(function(results){
	
            var data = {
                id : req.session.uid,
                name: req.session.un,
                type: req.session.type,
                uList: results
            };
            res.render('portal/admin_pages/user', data);
        });
    }else{
        res.redirect('/login');
    }
});

router.get('/user/edit/:id', function(req, res){
    if(req.session.type == 1){
        userModel.get(req.params.id, function(result){
            var data = {
                id : req.session.uid,
                name: req.session.un,
                info: req.session.type,
                user: result
            };
            if(result != ""){
                res.render('portal/admin_pages/user_edit', data);
            }else{
                res.redirect('/home/user');
            }
        });
    }else{
        res.redirect('/login');
    }
});

router.post("/user/edit/:id", function(req, res){
    if(req.session.type == 1){
        var user = {
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        };
    
        userModel.update(user, function(status){
    
            if(status){
                res.redirect('/home/user');
            }else{
                res.redirect('/home/edit:'+req.params.id);
            }
        });
    }else{
        res.redirect('/login');
    }
});

router.post("/approve/:id", function(req, res){
    if(req.session.type == 1){
        var user = {
            id: req.params.id,
        };
    
        userModel.approve(user, function(status){
    
            if(status){
                res.redirect('/home/user');
            }
        });
    }else{
        res.redirect('/login');
    }
});

router.post("/user/delete/:id", function(req, res){
    if(req.session.type == 1){
        var user = {
            id: req.params.id,
        };
    
        userModel.delete(user, function(status){
    
            if(status){
                res.redirect('/home/user');
            }else{
                res.redirect('/home/delete:'+req.params.id);
            }
        }); 
    }else{
        res.redirect('/login');
    }
});

router.get('/content',function(req,res){
    if(req.session.uid != null){
        contentModel.getAll(function(results){
            partialModel.getAllCategories(function(categoryResults){
                userModel.getAll(function(uploaderResults){
                    var data = {
                        id : req.session.uid,
                        name: req.session.un,
                        type: req.session.type,
                        contentList: results,
                        uploaderList: uploaderResults,
                        categoryList: categoryResults
                    };
                    res.render('portal/admin_pages/active_content', data);
                });
            });   
        });
    }else{
        res.redirect('/login');
    }
});

router.get('/request',function(req,res){
    if(req.session.uid != null){
        partialModel.getAllCategories(function(categories){
            requestModel.getAll(function(requests){
                var data = {
                    id : req.session.uid,
                    name: req.session.un,
                    type: req.session.type,
                    categoryList: categories,
                    requestList: requests
                };
                res.render('portal/admin_pages/requests', data);
            });
        });   
    }else{
        res.redirect('/login');
    }
});
// //Content 

router.get('/content/add',function(req,res){
    if(req.session.uid != null){
        partialModel.getAllCategories(function(categories){
            partialModel.getAllSubCategories(function(subcategories){
                partialModel.getAllFilters(function(filters){
                    var data = {
                        id : req.session.uid,
                        name: req.session.un,
                        type: req.session.type,
                        categoryList: categories,
                        subcategoryList: subcategories,
                        filterList:filters
    
                    };
                    res.render('portal/admin_pages/add_content',data);
                })
            })
        });
    }else{
        res.redirect('/login');
    }
    
});

router.post('/content/add',function(req,res){
    var content = {
		name: req.body.name,
		description: req.body.description,
        category: req.body.category,
        uploader: req.session.uid,
        sub_category: req.body.sub_category,
        filter: req.body.filter
    };
    console.log(content);
    contentModel.insert(content, function(status){

		if(status){
			res.redirect('/home/content');
		}else{
			res.redirect('/home/content/add');
		}
	});
});


router.get('/content/:id', function(req, res){
    if(req.session.uid != null){
        contentModel.get(req.params.id,function(content){
            partialModel.getAllCategories(function(categories){
                partialModel.getAllSubCategories(function(subcategories){
                    partialModel.getAllFilters(function(filters){
                        userModel.getAll(function(uploader){
                            var data = {
                                id : req.session.uid,
                                name: req.session.un,
                                type: req.session.type,
                                categoryList: categories,
                                subcategoryList: subcategories,
                                filterList:filters,
                                uploaderList:uploader,
                                contentt:content,
            
                            };
                            console.log(data);
                            res.render('portal/admin_pages/show_content',data);
                        })  
                    })
                })
            });
        })
    }else{
        res.redirect('/login');
    }
});

router.get('/content/edit/:id', function(req, res){
    if(req.session.uid != null){
        contentModel.get(req.params.id,function(contentt){
            partialModel.getAllCategories(function(categories){
                partialModel.getAllSubCategories(function(subcategories){
                    partialModel.getAllFilters(function(filters){
                        var data = {
                            id : req.session.uid,
                            name: req.session.un,
                            type: req.session.type,
                            content: contentt,
                            categoryList: categories,
                            subcategoryList: subcategories,
                            filterList: filters,
                        };
                        res.render('portal/admin_pages/edit_content', data);
                    });
                });   
            });
        });
    }else{
        res.redirect('/login');
    }
});

router.post("/content/edit/:id", function(req, res){
    if(req.session.uid != null){
        var content = {
            id: req.params.id,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            subcategory: req.body.subcategory,
            filter: req.body.filter,
        };
        contentModel.update(content, function(status){
            if(status){
                res.redirect('/home/content');
            }else{
                res.redirect('/home/content/edit/:'+req.params.id);
            }
        });
    }else{
        res.redirect('/login');
    }
});

router.post("/content/delete/:id", function(req, res){
    if(req.session.uid != null){
        var content = {
            id: req.params.id,
        };

        contentModel.delete(content, function(status){

            if(status){
                res.redirect('/home/content');
            }else{
                res.redirect('/home/content');
            }
        });
    }else{
        res.redirect('/login');
    }
});

module.exports = router;

