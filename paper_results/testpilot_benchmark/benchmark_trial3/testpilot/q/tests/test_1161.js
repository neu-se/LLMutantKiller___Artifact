let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify returns a function', function() {
        // Create a simple promise
        const promise = q.makePromise(function(resolve, reject) {
            resolve('test');
        });
        
        // Test that denodeify returns a function
        const denodeified = promise.denodeify();
        assert.strictEqual(typeof denodeified, 'function');
    });
});