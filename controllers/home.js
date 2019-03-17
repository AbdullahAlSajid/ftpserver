var express = require('express');
var userModel = require.main.require('./models/user_model');
// var reportModel = require.main.require('./models/report_model');
// var categoryModel = require.main.require('./models/category_model');
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

// //Report 

// router.get('/report/add',function(req,res){
//     categoryModel.getAll(function(results){
	
//         var data = {
//             id : req.session.uid,
//             name: req.session.un,
//             info: req.session.type,
//             categoryList: results
//         };
//         res.render('portal/reporter_pages/add_report',data);
//     });
// });

// router.post('/report/add',function(req,res){
//     // var form = new formidable.IncomingForm()
//     // form.parse(req);
//     // form.on('fileBegin', function (name, file){
//     //     file.path = '../newspaper/public/uploads/reports/img/' + file.name;
//     // });
//     // form.on('file', function (name, file){
//     //     console.log('Uploaded ' + file.name);
//     // });

//     var report = {
// 		title: req.body.title,
// 		description: req.body.description,
//         category: req.body.category,
//         reporterId: req.session.uid,
//         date: new Date(),
//         // file: req.files.uploaded_image,
// 		// img_name: file.name,
//     };
//     console.log(report);
//     reportModel.insert(report, function(status){

// 		if(status){
// 			res.redirect('/home');
// 		}else{
// 			res.redirect('/home/report/add');
// 		}
// 	});
// });

// router.get('/report/myreport',function(req,res){
//     if(req.session.uid != null){
//         reportModel.getAllMy(req.session.uid,function(results){
//             categoryModel.getAll(function(categoryResults){
//                 var data = {
//                     id : req.session.uid,
//                     name: req.session.un,
//                     info: req.session.type,
//                     reportList: results,
//                     categoryList: categoryResults
//                 };
//                 res.render('portal/reporter_pages/my_report', data);
//             });
            
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.get('/mail',function(req,res){
//     var data = {
//         id : req.session.uid,
//         name: req.session.un,
//         info: req.session.type,
//     };
//     res.render('portal/editor_pages/mail',data);
// });

// router.get('/report/myreport/:id', function(req, res){

// 	reportModel.get(req.params.id, function(result){
//         categoryModel.getAll(function(categoryResults){
//             var data = {
//                 id : req.session.uid,
//                 name: req.session.un,
//                 info: req.session.type,
//                 report: result,
//                 categoryList: categoryResults
//             };
//             if(result != ""){
//                 res.render('portal/reporter_pages/show_report', data);
//             }else{
//                 res.redirect('/home');
//             }
//         });
// 	});
// });

// router.get('/report/myreport/edit/:id', function(req, res){

// 	reportModel.get(req.params.id, function(result){
//         categoryModel.getAll(function(categoryResults){
//             var data = {
//                 id : req.session.uid,
//                 name: req.session.un,
//                 info: req.session.type,
//                 report: result,
//                 categoryList: categoryResults
//             };
//             if(result != ""){
//                 res.render('portal/reporter_pages/edit_report', data);
//             }else{
//                 res.redirect('/home');
//             }
//         });
// 	});
// });

// router.post("/report/myreport/edit/:id", function(req, res){
//     var report = {
//         id: req.params.id,
//         title: req.body.title,
//         category: req.body.category,
//         description: req.body.description
//     };

//     reportModel.reporterUpdate(report, function(status){

//         if(status){
//             res.redirect('/home/report/myreport');
//         }else{
//             res.redirect('/home/report/myreport/edit/:'+req.params.id);
//         }
//     });
// });

// router.post("/report/myreport/delete/:id", function(req, res){
//     var report = {
//         id: req.params.id,
//     };

//     reportModel.reporterdelete(report, function(status){

//         if(status){
//             res.redirect('/home/report/myreport');
//         }else{
//             res.redirect('/home/delete:'+req.params.id);
//         }
//     });
// });

// router.get('/report/pending',function(req,res){
//     if(req.session.type == 1){
//         reportModel.getAllByStatus(0,function(results){
//             categoryModel.getAll(function(categoryResults){
//                 userModel.getAll(function(reporterResults){
//                     var data = {
//                         id : req.session.uid,
//                         name: req.session.un,
//                         info: req.session.type,
//                         reportList: results,
//                         reporterList: reporterResults,
//                         categoryList: categoryResults
//                     };
//                     res.render('portal/editor_pages/pending_report', data);
//                 });
//             });   
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.get('/report/pending/:id', function(req, res){
//     if(req.session.type == 1){
//         reportModel.get(req.params.id, function(result){
//             categoryModel.getAll(function(categoryResults){
//                 userModel.getAll(function(reporterResults){
//                     var data = {
//                         id : req.session.uid,
//                         name: req.session.un,
//                         info: req.session.type,
//                         report: result,
//                         reporterList: reporterResults,
//                         categoryList: categoryResults
//                     };
//                     res.render('portal/editor_pages/show_report', data);
//                 });
//             });   
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.get('/report/pending/edit/:id', function(req, res){
//     if(req.session.type == 1){
//         reportModel.get(req.params.id, function(result){
//             categoryModel.getAll(function(categoryResults){
//                 userModel.getAll(function(reporterResults){
//                     var data = {
//                         id : req.session.uid,
//                         name: req.session.un,
//                         info: req.session.type,
//                         report: result,
//                         reporterList: reporterResults,
//                         categoryList: categoryResults
//                     };
//                     res.render('portal/editor_pages/approve_pending_report', data);
//                 });
//             });   
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.post("/report/pending/edit/:id", function(req, res){
//     if(req.session.type == 1){
//         var report = {
//             id: req.params.id,
//             title: req.body.title,
//             category: req.body.category,
//             description: req.body.description,
//             section: req.body.section,
//             breaking: req.body.breaking,
//             date: new Date(),
//         };
//         reportModel.editorPendingUpdate(report, function(status){
//             if(status){
//                 res.redirect('/home/report/pending');
//             }else{
//                 res.redirect('/home/report/pending/edit/:'+req.params.id);
//             }
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.post("/report/pending/delete/:id", function(req, res){
//     if(req.session.type == 1){
//         var report = {
//             id: req.params.id,
//         };

//         reportModel.delete(report, function(status){

//             if(status){
//                 res.redirect('/home/report/pending');
//             }else{
//                 res.redirect('/home/report/pending');
//             }
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.get('/report/active',function(req,res){
//     if(req.session.type == 1){
//         reportModel.getAllByStatus(1,function(results){
//             categoryModel.getAll(function(categoryResults){
//                 userModel.getAll(function(reporterResults){
//                     var data = {
//                         id : req.session.uid,
//                         name: req.session.un,
//                         info: req.session.type,
//                         reportList: results,
//                         reporterList: reporterResults,
//                         categoryList: categoryResults
//                     };
//                     res.render('portal/editor_pages/active_report', data);
//                 });
//             });   
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.get('/report/active/:id', function(req, res){
//     if(req.session.type == 1){
//         reportModel.get(req.params.id, function(result){
//             categoryModel.getAll(function(categoryResults){
//                 userModel.getAll(function(reporterResults){
//                     var data = {
//                         id : req.session.uid,
//                         name: req.session.un,
//                         info: req.session.type,
//                         report: result,
//                         reporterList: reporterResults,
//                         categoryList: categoryResults
//                     };
//                     res.render('portal/editor_pages/show_report', data);
//                 });
//             });   
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.get('/report/active/edit/:id', function(req, res){
//     if(req.session.type == 1){
//         reportModel.get(req.params.id, function(result){
//             categoryModel.getAll(function(categoryResults){
//                 userModel.getAll(function(reporterResults){
//                     var data = {
//                         id : req.session.uid,
//                         name: req.session.un,
//                         info: req.session.type,
//                         report: result,
//                         reporterList: reporterResults,
//                         categoryList: categoryResults
//                     };
//                     res.render('portal/editor_pages/edit_active_report', data);
//                 });
//             });   
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.post("/report/active/edit/:id", function(req, res){
//     if(req.session.type == 1){
//         var report = {
//             id: req.params.id,
//             title: req.body.title,
//             category: req.body.category,
//             description: req.body.description,
//             section: req.body.section,
//             breaking: req.body.breaking,
//             date: new Date(),
//         };
//         reportModel.editorActiveUpdate(report, function(status){
//             if(status){
//                 res.redirect('/home/report/active');
//             }else{
//                 res.redirect('/home/report/active/edit/:'+req.params.id);
//             }
//         });
//     }else{
//         res.redirect('/login');
//     }
// });

// router.post("/report/active/delete/:id", function(req, res){
//     if(req.session.type == 1){
//         var report = {
//             id: req.params.id,
//         };

//         reportModel.delete(report, function(status){

//             if(status){
//                 res.redirect('/home/report/active');
//             }else{
//                 res.redirect('/home/report/active');
//             }
//         });
//     }else{
//         res.redirect('/login');
//     }
// });


module.exports = router;

