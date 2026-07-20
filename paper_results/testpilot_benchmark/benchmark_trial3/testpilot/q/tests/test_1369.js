let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with rejected promise', function(done) {
        // Create a rejected promise
        let rejectedPromise = q.reject(new Error('test error'));
        
        // q.nearer should return the promise itself since it's not fulfilled
        let result = q.nearer(rejectedPromise);
        assert.strictEqual(result, rejectedPromise);
        done();
    });
    
    })