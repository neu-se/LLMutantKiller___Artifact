let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with regular object', function(done) {
        const obj = { foo: "bar", nested: { value: 42 } };
        
        q.get(obj, "foo").then(function(result) {
            assert.equal(result, "bar");
            done();
        }).catch(done);
    });

    })