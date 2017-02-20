require('dotenv').config()
/*
* This example uses the node MongoDB module to connect to the local
* mongodb database on this virtual machine
*
* More here: http://mongodb.github.io/node-mongodb-native/markdown-docs/collections.html
*/

//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient;

//connect away
MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
  if (err) throw err;
  console.log('Connected to Database');

  //create collection
	db.createCollection('users', function(err, collection){
	   if (err) throw err;

	   	console.log("Created users");
	 		console.log(collection);
	});
});


