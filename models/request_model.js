var db = require('./db');


module.exports = {
    insert: function(request, callback){
		var sql = "insert into request values(null, '"+ request.email+"','"+ request.name+"','"+ request.category+"')"
		db.execute(sql, function(success){
			callback(success);
		});
    },
    getAll: function(callback){
		var sql = "select * from request";
		db.getResults(sql, function(results){
			callback(results);
        });
    }
}