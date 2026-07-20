let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with rejected promise', function(done) {
        let errorMessage = 'Test error';
        let rejectedPromise = q.reject(new Error(errorMessage));
        
        q.catch(rejectedPromise, function(error) {
            assert.strictEqual(error.message, errorMessage);
            done();
        });
    });
    
    })