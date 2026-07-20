let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - return value', function(done) {
        let promise = q.makePromise();
        
        // Test that set method returns the promise (for chaining)
        let result = promise.set('chainKey', 'chainValue');
        
        // Assuming it returns the promise for method chaining
        assert.strictEqual(result, promise);
        assert.strictEqual(promise.chainKey, 'chainValue');
        done();
    });

    })