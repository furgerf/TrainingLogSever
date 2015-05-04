// load modules
var mongoose = require("mongoose"),
    expect = require("expect.js"),

// create mongoose stuff
    Schema = mongoose.Schema,
    testSchema = new Schema({
      foo: String,
      bar: Number,
    }),
    Test = mongoose.model('Test', testSchema),
    testObject;

// establish db connection
mongoose.connect('mongodb://localhost/test');

// tests
describe("Prototype Test", function(){
  // prepare db
  beforeEach(function(done){
    // insert documents
    testObject = new Test({ foo: 'foobar', bar: 42});
    testObject.save(function (err, test) {
      // expect no error
      expect(err).to.be(null);
      // ensure we find exactly those documents that were just inserted
      Test.find(function (err, docs) {
        expect(err).to.be(null);
        expect(docs).to.have.length(1);
        expect(docs[0]._id).to.eql(testObject._id);
        done();
      })
    });
  });

  afterEach(function(done){
    // remove all documents
    Test.remove(function(err) {
      // expect no error
      expect(err).to.be(null);
      done();
    });
  });


  it("retrieves a document", function(done){
    Test.find({}, function (err, docs) {
      expect(err).to.be(null);
      expect(docs).to.have.length(1);
      expect(docs[0]._id).to.eql(testObject._id);
      done();
    })
  });

  it("adds a new document", function(done){
    // add object
    var newTestObject = new Test({ foo: 'asdf', bar: -1 });
    newTestObject.save( function (err, doc) {
      expect(err).to.be(null);
      // ensure we can retrieve it
      Test.find(function (err2, docs) {
        expect(err).to.be(null);
        expect(docs).to.have.length(2);
        expect(docs[0]._id).to.eql(testObject._id);
        expect(docs[1]._id).to.eql(newTestObject._id);
        done();
      });
    });
  });

  it("removes a document", function(done){
    // remove object
    Test.remove({ _id: testObject._id }, function (err) {
      expect(err).to.be(null);
      // ensure we have no more documents
      Test.find(function (err2, docs) {
        expect(err).to.be(null);
        expect(docs).to.have.length(0);
        done();
      });
    });
  });

  it('should return -1 when the value is not present')

});

