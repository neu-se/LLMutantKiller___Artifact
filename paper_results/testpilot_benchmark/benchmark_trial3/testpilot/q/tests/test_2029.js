let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally with callback returning a promise', function(done) {
        let finallyExecuted = false;
        let originalValue = 'original';
        
        let promise = q.resolve(originalValue);
        
        promise.finally(function() {
            finallyExecuted = true;
            return q.delay(10).then(function() {
                return 'finally result';
            });
        }).then(function(value) {
            assert.strictEqual(finallyExecuted, true, 'finally callback should be executed');
            assert.strictEqual(value, originalValue, 'original value should be preserved even when finally returns a promise');
            done();
        }).catch(done);
    });

    })