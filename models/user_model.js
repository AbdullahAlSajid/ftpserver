var db = require('./db');


module.exports = {
	get: function(userId, callback){
		var sql = "select * from users where id="+userId;
		db.getResults(sql, function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	validate: function(users, callback){
        var sql = "select * from users where email = '" + users.email + "' and password = '" + users.password + "' and status = 1 ";
		db.getResults(sql, function(result){

			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	},
	insert: function(users, callback){
		var sql = "insert into users values(null, '"+ users.email+"','"+ users.name+"','"+ users.password+"', 2, 0)"
		db.execute(sql, function(success){
			callback(success);
		});
	},
	update: function(users, callback){
		var sql = "update users set name='"+users.name+"',  email ='"+users.email+"' where id="+users.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	approve: function(users, callback){
		var sql = "update users set status = 1 where id="+users.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(users, callback){
		var sql = "delete from users where id="+users.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}