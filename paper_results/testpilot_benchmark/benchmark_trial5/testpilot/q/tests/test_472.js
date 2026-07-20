let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with object property', function(done) {
        let testObject = { foo: "bar", nested: { value: 42 } };
        
        q.get(testObject, "foo").then(function(result) {
            assert.equal(result, "bar");
            done();
        }).catch(done);
    });

    })