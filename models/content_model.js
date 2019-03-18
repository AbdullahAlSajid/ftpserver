var db = require('./db');

module.exports = {
	get: function(contentId, callback){
		var sql = "select * from contents where id="+contentId;
		db.getResults(sql, function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from contents";
		db.getResults(sql, function(results){
			callback(results);
		});
  },
	getAllMy: function(contenterId,callback){
		var sql = "select * from contents where contenter ="+contenterId;
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAllByStatus: function(status,callback){
		var sql = "select * from contents where status ="+status;
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getBreaking: function(callback){
		var sql = "select * from contents where breaking = 1 and status = 1";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getInternational: function(callback){
		var sql = "select * from contents where category = 1 and status = 1";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getFeatured: function(callback){
		var sql = "select * from contents where section = 3 and status = 1";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	validate: function(content, callback){
        var sql = "select * from contents where email = '" + content.email + "' and password = '" + user.password + "' and status = 1 ";
		db.getResults(sql, function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	insert: function(content, callback){
		var sql = "insert into contents values(null, '"+ content.name+"','"+ content.description+"','"+ content.uploader+"', 'null', '0','"+ content.category+"','"+ content.sub_category+"','"+ content.filter+"')";
		console.log(sql);
		db.execute(sql, function(success){
			callback(success);
		});
    },
  editorInsert: function(content, callback){
		var sql = "insert into contents values(null, '"+ user.email+"','"+ user.name+"','"+ user.password+"', 2, 0)"
		console.log(sql);
		db.execute(sql, function(success){
			callback(success);
		});
	},
	update: function(content, callback){
		var sql = "update contents set name='"+content.name+"',  description ='"+content.description+"',  category ='"+content.category+"' ,  sub_category ='"+content.subcategory+"', filter ='"+content.filter+"' where id="+content.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
  contenterUpdate: function(content, callback){
		var sql = "update contents set title='"+content.title+"',  category ='"+content.category+"',  description ='"+content.description+"',  status = 2 where id="+content.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	editorPendingUpdate: function(content, callback){
		var sql = "update contents set title='"+content.title+"',  category ='"+content.category+"', section ='"+content.section+"', breaking ='"+content.breaking+"', publishedat ='"+content.date+"',  description ='"+content.description+"',  status = 1 where id="+content.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	editorActiveUpdate: function(content, callback){
		var sql = "update content set title='"+content.title+"',  category ='"+content.category+"', section ='"+content.section+"', breaking ='"+content.breaking+"', updatedat ='"+content.date+"',  description ='"+content.description+"',  status = 1 where id="+content.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	approve: function(content, callback){
		var sql = "update content set status = 1 where id="+content.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    contenterdelete: function(content, callback){
        var sql = "update content set  status = 3 where id="+content.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(content, callback){
		var sql = "delete from contents where id="+content.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}