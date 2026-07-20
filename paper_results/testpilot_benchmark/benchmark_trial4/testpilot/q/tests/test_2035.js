let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally with resolved promise', function(done) {
        let finallyExecuted = false;
        let resolvedValue = 'success';
        
        let promise = q.resolve(resolvedValue);
        
        promise.finally(function() {
            finallyExecuted = true;
        }).then(function(value) {
            assert.strictEqual(finallyExecuted, true, 'finally callback should be executed');
            assert.strictEqual(value, resolvedValue, 'resolved value should be preserved');
            done();
        }).catch(done);
    });

    })