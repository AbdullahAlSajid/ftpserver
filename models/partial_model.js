var db = require('./db');


module.exports = {
	get: function(categoryId, callback){
		var sql = "select * from category where id="+categoryId;
		db.getResults(sql, function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAllCategories: function(callback){
		var sql = "select * from categories";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAllSubCategories: function(callback){
		var sql = "select * from sub_categories";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAllFilters: function(callback){
		var sql = "select * from filters";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	validate: function(category, callback){
        var sql = "select * from category where email = '" + category.email + "' and password = '" + category.password + "' and status = 1 ";
		db.getResults(sql, function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	},
	insert: function(category, callback){
		var sql = "insert into category values(null, '"+ category.email+"','"+ category.name+"','"+ category.password+"', 2, 0)"
		db.execute(sql, function(success){
			callback(success);
		});
	},
	update: function(category, callback){
		var sql = "update category set name='"+category.name+"',  email ='"+category.email+"' where id="+category.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	approve: function(category, callback){
		var sql = "update category set status = 1 where id="+category.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(category, callback){
		var sql = "delete from category where id="+category.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}