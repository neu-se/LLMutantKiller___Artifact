let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.passByCopy with rejected promise', function(done) {
        // Create a rejected promise
        let rejectedPromise = q.reject(new Error('test error'));
        
        // Test that passByCopy works on rejected promises
        let result = rejectedPromise.passByCopy();
        assert.strictEqual(result, rejectedPromise, 'passByCopy should work on rejected promises');
        done();
    });
});