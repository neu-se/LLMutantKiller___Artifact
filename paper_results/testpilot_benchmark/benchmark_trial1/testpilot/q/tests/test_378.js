let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with fulfilled promise', function(done) {
        // Create a fulfilled promise
        let fulfilledPromise = q.resolve(42);
        
        // q.nearer should return the resolved value
        let result = q.nearer(fulfilledPromise);
        assert.strictEqual(result, 42);
        done();
    });
    
    })