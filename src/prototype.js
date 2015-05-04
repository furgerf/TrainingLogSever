var request = require('request'),

    config = require('../config.json');

exports.prototype = function (req, res, next) {
    'use strict';

    console.log('\n---> GET /prototype/');

    /*
    mongo.connect("mongodb://localhost:27017/book", function (err, db) {
        if (err) {
          console.log("Error: " + err);
          process.exit();
        }

        var collection = db.collection('test');
        var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

        collection.insert(docs, {w:1}, function(err, result) {
          // ASYNCHRONOUS!

          collection.find().toArray(function(err, items) {});

          var stream = collection.find({mykey:{$ne:2}}).stream();
          stream.on("data", function(item) {
            console.log(item);
          });
          stream.on("end", function() {});

          collection.findOne({mykey:1}, function(err, item) {});
        });

        console.log("Mongo connection successful!");
      });
*/
};
