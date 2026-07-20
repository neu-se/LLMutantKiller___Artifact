let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally with rejected promise', function(done) {
        let finallyExecuted = false;
        let rejectedError = new Error('test error');
        
        let promise = q.reject(rejectedError);
        
        promise.finally(function() {
            finallyExecuted = true;
        }).catch(function(error) {
            assert.strictEqual(finallyExecuted, true, 'finally callback should be executed');
            assert.strictEqual(error, rejectedError, 'rejected error should be preserved');
            done();
        }).catch(done);
    });

    })