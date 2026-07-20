let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - returns promise for chaining', function(done) {
        let promise = q.makePromise();
        
        // Test that set returns the promise for method chaining
        let result = promise.set('chainKey', 'chainValue');
        
        // Assuming set returns the promise itself for chaining
        assert.strictEqual(result, promise);
        assert.strictEqual(promise.chainKey, 'chainValue');
        done();
    });

    })