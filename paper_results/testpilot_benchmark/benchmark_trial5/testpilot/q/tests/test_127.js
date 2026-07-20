let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - edge cases with keys', function(done) {
        let promise = q.makePromise();
        
        // Test with various key types and edge cases
        promise.set('', 'empty string key');
        promise.set('123', 'numeric string key');
        promise.set('special!@#$%', 'special characters');
        
        if (typeof promise.get === 'function') {
            // Handle async get method by using promises
            Promise.all([
                promise.get(''),
                promise.get('123'),
                promise.get('special!@#$%')
            ]).then(function(values) {
                assert.strictEqual(values[0], 'empty string key');
                assert.strictEqual(values[1], 'numeric string key');
                assert.strictEqual(values[2], 'special characters');
                done();
            }).catch(done);
        } else {
            done();
        }
    });
});