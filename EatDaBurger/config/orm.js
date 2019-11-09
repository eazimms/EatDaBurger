// Import connection. 
var connection = require("../config/connection.js"); 

// Helper for SQL syntax, 
function printQuestionMarks(num){
  var arr = []; 

  for(var i = 0; i < num; i++){
    arr.push("?"); 
  }

  return arr.toString(); 

}

// Convert object into sql syntax
function objToSql(ob){
  var arr = []; 
// Loop through key
  for(var key in ob){
    var value = ob[key]; 

    if(Object.hasOwnProperty.call(ob, key)) {

      if(typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'"; 

        arr.push(key + "=" + value); 

      }
    }
    return arr.toString(); 
  }



}

// Object for statement functions

var orm = {
  selectAll: function(tableInput, cb){
    var queryString = "SELECT * FROM " + tableInput + ";"; 
    connection.query(queryString, function(err, result){
      if (err){
        throw err; 
      }
      cb (result); 
    });
  }, 
  // Create new
  insertOne: function(table, cols, vals, cb){
    var queryString = "INSERT INTO" + table; 

    queryString += "("; 
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result){
      if (err){
        throw err
      }
      cb(result); 
    }); 

  }, 
  // Update
  updateOne: function(table, objColVals, condition, cb){
    var queryString = "UPDATE" + table; 

    queryString += " SET "; 
    queryString += objToSql(objColVals); 
    queryString += "WHERE"; 
    queryString += condition; 

    console.log(queryString); 
    connection.query(queryString, function (err, result){
      if(err){
        throw err; 
      }
      cb(result); 
    }); 
  }, 
  // Delete
  delete: function(table, condition, cb) {
    var queryString = "DELETE"   + table; 

    queryString += "DELETE FROM " + table; 
    queryString += "WHERE"; 
    queryString += condition; 

    connection.query(queryString, function (err, result){
      if(err){
        throw err;
      }
      cb(result);
    }); 

  }
}; 
// Export
module.exports = orm;