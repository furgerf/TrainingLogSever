/**
* server.js
* Holds all endpoints for API
*/

'use strict';

// required modules
var restify = require('restify'),
    config = require('./config.json'),
    mongo = require('mongodb').MongoClient,
/*
// files for each of the api routes
    getAccount = require('./src/account/getAccount.js'),
    createAccount = require('./src/account/createAccount.js'),
    updateAccount = require('./src/account/updateAccount.js'),
    deleteAccount = require('./src/account/deleteAccount.js'),

    getProduct = require('./src/product/getProduct.js'),
    getAllProducts = require('./src/product/getAllProducts.js'),
    createProduct = require('./src/product/createProduct.js'),
    updateProduct = require('./src/product/updateProduct.js'),
    deleteProduct = require('./src/product/deleteProduct.js'),

    getAllOffers = require('./src/offer/getAllOffers.js'),
    createOffer = require('./src/offer/createOffer.js'),
    updateOffer = require('./src/offer/updateOffer.js'),
    */

// server
    server = restify.createServer();

// prepare server
server.use(restify.bodyParser());
//server.use(restify.authorizationParser());
server.use(restify.queryParser());

// start server
server.listen(config.api.port, function () {
    console.log('Training Log API running on port ' + config.api.port);

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

    /*
    // Account
    server.post(/^\/account\/?$/, createAccount.createAccount);      // POST /account
    server.get(/^\/account\/(.+)$/, getAccount.getAccount);          // GET /account/[ID]
    server.put(/^\/account\/(.+)$/, createAccount.createAccount);    // PUT /account/[ID]
    server.post(/^\/account\/(.+)$/, updateAccount.updateAccount);   // POST /account/[ID]
    server.del(/^\/account\/(.+)$/, deleteAccount.deleteAccount);    // DELETE /account/[ID]

    // Product
    server.get(/^\/product\/?$/, getAllProducts.getAllProducts);     // GET /product
    server.get(/^\/product\/(.+)$/, getProduct.getProduct);          // GET /product/[ID]
    server.post(/^\/product\/?$/, createProduct.createProduct);      // POST /product
    server.post(/^\/product\/(.+)$/, updateProduct.updateProduct);   // POST /product/[ID]
    server.del(/^\/product\/(.+)$/, deleteProduct.deleteProduct);    // DELETE /product/[ID


    // Offer
    server.get(/^\/offer\/?$/, getAllOffers.getAllOffers);           // GET /offer/
    server.post(/^\/offer\/?$/, createOffer.createOffer);            // POST /offer/
    server.post(/^\/offer\/(.+)$/, updateOffer.updateOffer);         // POST /offer/[ID]
    */

    // Shutdown
    server.get(/^\/exit$/, process.exit);

    // Root
    server.get(/^\/$/, function (req, res) {
        res.setHeader('content-type', 'application/json');
        res.write('Welcome To The Training Log!');
        res.end();
    });
});
