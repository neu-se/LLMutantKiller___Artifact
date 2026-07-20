let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        let testValue = 42;
        let descriptor = {
            when: function() {
                return testValue;
            }
        };
        
        let promise = q.makePromise(descriptor);
        
        // Test that the promise resolves correctly
        q.when(promise, function(value) {
            assert.equal(value, testValue);
            done();
        }).catch(done);
    });

    })